import fs from 'fs';
import path from 'path';
import * as csstree from 'css-tree';

const inputPath = './dist/css/style.css'; // Путь к исходному CSS
const outputPath = './backup/chunks/';  // Папка для выходных файлов

// Создаём папку для выходных файлов, если её нет
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

// Читаем CSS
const css = fs.readFileSync(inputPath, 'utf8');

// Парсим CSS в AST
const ast = csstree.parse(css);

// Функция для извлечения селектора из SelectorList
function extractSelector(selectorList) {
    if (!selectorList || !selectorList.children) return null;

    const selectors = [];
    selectorList.children.forEach(selectorNode => {
        if (selectorNode.type === 'Selector' && selectorNode.children) {
            selectorNode.children.forEach(child => {
                if (child.type === 'ClassSelector') {
                    selectors.push(`.${child.name}`);
                } else if (child.type === 'TypeSelector') {
                    selectors.push(child.name);
                } else if (child.type === 'PseudoClassSelector') {
                    selectors.push(`:${child.name}`);
                } else if (child.type === 'Combinator') {
                    selectors.push(` ${child.name} `);
                }
            });
        }
    });

    return selectors.join('').replace(/[^a-zA-Z0-9]/g, '_');
}

// Проходим по всем правилам
csstree.walk(ast, {
    enter: function (node) {
        if (node.type === 'Rule') {
            // Логируем правило для отладки
            console.log('Обнаружено правило:', JSON.stringify(node, null, 2));

            // Извлекаем селектор
            const selector = extractSelector(node.prelude);
            if (selector) {
                const ruleStr = csstree.generate(node); // Генерируем CSS из узла
                const fileName = `${selector}.css`; // Формируем имя файла
                fs.writeFileSync(path.join(outputPath, fileName), ruleStr); // Сохраняем файл
                console.log(`Создан файл: ${fileName}`);
            } else {
                console.warn('⚠️ Пропущено правило без селектора:', JSON.stringify(node, null, 2));
            }
        } else if (node.type === 'Atrule' && node.name === 'media') {
            // Обрабатываем @media
            const mediaQuery = csstree.generate(node.prelude).replace(/[^a-zA-Z0-9]/g, '_');
            const mediaFileName = `media_${mediaQuery}.css`;
            const mediaContent = csstree.generate(node);
            fs.writeFileSync(path.join(outputPath, mediaFileName), mediaContent);
            console.log(`Создан файл: ${mediaFileName}`);
        }
    }
});