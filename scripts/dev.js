import { spawn } from 'node:child_process';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const backendDirectory = fileURLToPath(new URL('../backend', import.meta.url));
const children = [];
let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }

  process.exit(exitCode);
}

function runProcess(label, args, cwd) {
  const child = spawn(npmCommand, args, {
    cwd,
    stdio: 'inherit',
  });

  children.push(child);

  child.on('exit', (code) => {
    if (shuttingDown) {
      return;
    }

    if (code && code !== 0) {
      console.error(`${label} exited with code ${code}. Stopping the dev session.`);
      shutdown(code);
    }
  });
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

runProcess('Frontend', ['run', 'dev'], process.cwd());
runProcess('Backend', ['start'], backendDirectory);
