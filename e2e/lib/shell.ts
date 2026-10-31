import { execFileSync } from 'node:child_process';

export interface RunOptions {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  /** Stream the command output to the terminal instead of capturing it. */
  inherit?: boolean;
  /** Return the failure instead of throwing. */
  allowFailure?: boolean;
}

export interface CommandResult {
  ok: boolean;
  output: string;
}

/**
 * Run a command with an argument array, never a shell string, so a run id or a
 * path with spaces cannot be reinterpreted.
 */
export function run(
  command: string,
  args: string[],
  options: RunOptions = {},
): string {
  return runCommand(command, args, options).output;
}

export function runResult(
  command: string,
  args: string[],
  options: RunOptions = {},
): CommandResult {
  return runCommand(command, args, options);
}

function runCommand(
  command: string,
  args: string[],
  options: RunOptions,
): CommandResult {
  try {
    const output = execFileSync(command, args, {
      cwd: options.cwd,
      env: options.env ?? process.env,
      encoding: 'utf8',
      stdio: options.inherit ? 'inherit' : ['ignore', 'pipe', 'pipe'],
    });

    return { ok: true, output: typeof output === 'string' ? output : '' };
  } catch (error) {
    if (options.allowFailure) {
      const failure = error as { stdout?: string; stderr?: string };

      return {
        ok: false,
        output: `${failure.stdout ?? ''}${failure.stderr ?? ''}`,
      };
    }

    throw error;
  }
}

export function commandExists(command: string): boolean {
  return runResult('which', [command], { allowFailure: true }).ok;
}

export function requireCommand(command: string, hint: string): void {
  if (commandExists(command)) return;

  throw new Error(`Missing "${command}" on PATH. ${hint}`.trim());
}

export function requireEnv(name: string, hint?: string): string {
  const value = process.env[name];
  if (value) return value;

  throw new Error(`Missing environment variable ${name}. ${hint ?? ''}`.trim());
}
