const fs = require('fs');
const path = require('path');
const {
  exec
} = require('child_process');

// Укажите путь к вашему CSS-файлу
const cssPath = path.resolve(__dirname, 'dist/css/style.css'); // замените на актуальный путь к CSS
const backupPath = path.resolve(__dirname, 'backup/main.css');

// Проверяем, существует ли папка backup, если нет — создаём
const backupDir = path.dirname(backupPath);
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, {
    recursive: true
  });
}

console.log('Сохраняем текущий CSS...');

// Если старый CSS существует — сохраняем как backup
if (fs.existsSync(cssPath)) {
  Path,
  backupPath);
console.log('Текущий CSS сохранён как backup.');
}
else {
  console.log('CSS-файл не найден. Пропускаем бэкап.');
}

// Запускаем npm run dev
exec('npm run dev stdout, stderr) => {
    if (error) {
      console.error(`Ошибка выполнения: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log('Сборка завершена. Сравниваем CSS...');

    // Проверяем, изменился ли файл
    if (!fs.existsSync(backupPath)) {
      console.log('Невозможно сравнить: backup не найден.');
      return;
    }

    const oldCSS = fs.readFileSync(backupPath, 'utf8');
    const newCSS = fs.readFileSync(cssPath, 'utf8');

    if (oldCSS === newCSS) {
      console.log('CSS не изменился.');
      return;
    }

    // Сохраняем разницу в файл
    const diffPath = path.resolve(__dirname, 'diff-output.txt');
    const diff = require('diff').createTwoFilesPatch('old.css', 'new.css', oldCSS, newCSS); fs.writeFileSync(diffPath, diff);

    console.log(`Разница сохранена в: ${ // Опционально: открыть файл с разницей
    exec(`code "${diffPath}"`); // открывает в VSCode (Windows/Linux/macOS)
});