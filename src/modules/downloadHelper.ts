import chalk from 'chalk';

const downloadText = async (url: string): Promise<string> => {
  try {
    console.log(chalk.yellow(`Begin download ${url}`));
    const result = await fetch(url).then(r => r.text());
    console.log(
      chalk.green(
        `Download ${url} sucessfully - Result size: ${result.length}`
      )
    );
    return result;
  } catch {
    console.log(chalk.red(`Failed to procerss ${url}`));
    return "";
  }
};

export { downloadText };
