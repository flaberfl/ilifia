const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Укажите путь к вашему CSS-файлу
const cssPath = path.resolve(__dirname, 'dist/css/style.css'); // путь к новому CSS-файлу
const backupPath = path.resolve(__dirname, 'backup/style.css'); // путь к бэкапу

// Проверяем, существует ли папка backup, если нет — создаём
const backupDir = path.dirname(backupPath);
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

// Проверяем, существует ли CSS-файл перед бэкапом
if (fs.existsSync(cssPath)) {
    console.log('Создаём бэкап старого CSS...');
    fs.copyFileSync(cssPath, backupPath);
    console.log('Бэкап сохранён.');
} else {
    console.log('CSS-файл не найден. Пропускаем бэкап.');
}

console.log('Запускаем сборку npm run devbuild...');
exec('npm run devbuild', (error, stdout, stderr) => {
    if (error) {
        console.error(`Ошибка выполнения: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }

    console.log('Сборка завершена. Сравниваем старую и новую версии CSS...');

    // Проверяем, существует ли оба файла
    if (!fs.existsSync(backupPath)) {
        console.log('Бэкап не найден. Невозможно сравнить.');
        return;
    }

    if (!fs.existsSync(cssPath)) {
        console.log('Новый CSS-файл не найден. Невозможно сравнить.');
        return;
    }

    // Читаем содержимое файлов
    const oldCSS = fs.readFileSync(backupPath, 'utf8');
    const newCSS = fs.readFileSync(cssPath, 'utf8');

    if (oldCSS === newCSS) {
        console.log('CSS не изменился.');
        return;
    }

    // Сохраняем разницу в файл
    const outputPath = path.resolve(__dirname, 'diff-output.txt');
    const diff = require('diff').createTwoFilesPatch('old.css', 'new.css', oldCSS, newCSS);
    fs.writeFileSync(outputPath, diff);

    console.log(`Разница сохранена в: ${outputPath}`);

    // Опционально: открыть файл с разницей в VSCode
    exec(`code "${outputPath}"`); // открывает в VSCode (Windows/Linux/macOS)
});