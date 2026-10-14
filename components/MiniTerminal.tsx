"use client";
import { useState } from "react";
import { links } from "@/data/portfolio";

const destinations: Record<string, string> = {
  projects: "#work",
  kernels: "#fastinfer",
  experience: "#experience",
  leetcode: "#algorithms",
  contact: links.email,
};
const responses: Record<string, string> = {
  help: "whoami · projects · kernels · experience · leetcode · contact · clear",
  whoami:
    "Akarsh Malik. Software engineer in ML systems and agentic AI, MS CS at NYU. Focused on GPU kernels and LLM inference.",
  "sudo hire akarsh": "Good command. Let’s talk: malikakarsh@gmail.com",
};

export default function MiniTerminal({
  config,
}: {
  config: { prompt: string; hint: string };
}) {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([
    "A small detour. Type help to see the commands.",
  ]);
  function execute(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    if (!value) return;
    setCommand("");
    if (value === "clear") {
      setHistory([]);
      return;
    }
    if (destinations[value]) {
      window.location.href = destinations[value];
      setHistory((previous) =>
        [...previous, `$ ${value}`, `Opening ${value}…`].slice(-12),
      );
    } else {
      setHistory((previous) =>
        [
          ...previous,
          `$ ${value}`,
          responses[value] ?? `Unknown command: ${value}. Try help.`,
        ].slice(-12),
      );
    }
  }
  return (
    <details className="mini-terminal">
      <summary>
        <span>{config.prompt}</span>{" "}
        <span className="cursor" aria-hidden="true">
          _
        </span>
        <span className="terminal-hint">{config.hint}</span>
      </summary>
      <div className="terminal-body">
        <div role="log" aria-label="Terminal output" aria-live="polite">
          {history.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <form onSubmit={execute}>
          <label htmlFor="terminal-command">
            $ <span className="sr-only">Terminal command</span>
          </label>
          <input
            id="terminal-command"
            autoComplete="off"
            spellCheck={false}
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            placeholder="help"
          />
          <button type="submit">Run ↵</button>
        </form>
      </div>
    </details>
  );
}
