export const CURSOR_PI_BRIDGE_MCP_TOOL_PREFIX = "pi__";
export const CURSOR_PI_BRIDGE_PREFERENCE_TEXT =
	"Default to pi assets: pi MCP via pi__codemode (mcp__<server>__<tool> from ~/.pi/agent/mcp.json), pi skills, and other exposed pi__* bridge tools. Do not use Cursor plugin MCP, Cursor mcp-auth/Web API shell fallbacks, or Cursor-native subagents until you stop and the user explicitly approves (pi__cursor_ask_question when exposed).";

const CURSOR_PI_BRIDGE_CONTRACT_LINES = [
	"Pi bridge contract:",
	`${CURSOR_PI_BRIDGE_MCP_TOOL_PREFIX}* names are live Cursor MCP bridge tool names only when exposed in the current run.`,
	`Call the ${CURSOR_PI_BRIDGE_MCP_TOOL_PREFIX}* MCP tool name, not the real pi tool name shown in pi history or transcripts.`,
	CURSOR_PI_BRIDGE_PREFERENCE_TEXT,
	"Bridged calls execute through normal pi tool flow, so pi shows the real pi tool name and returns a normal pi tool result.",
	"Replay IDs, replay labels, and transcript tool names are display-only/context-only, not callable tools.",
	"Cursor-native host tools, settings, plugins, and configured MCP servers are separate from the pi bridge.",
] as const;

export function getCursorPiBridgeContractText(): string {
	return CURSOR_PI_BRIDGE_CONTRACT_LINES.join("\n");
}

function formatPromptGuidelines(promptGuidelines: readonly string[] | undefined): string | undefined {
	const guidelines = promptGuidelines?.map((guideline) => guideline.trim()).filter(Boolean) ?? [];
	if (guidelines.length === 0) return undefined;
	return ["Pi tool prompt guidelines:", ...guidelines.map((guideline) => `- ${guideline}`)].join("\n");
}

export function buildCursorPiBridgeMcpToolDescription(options: {
	piToolName: string;
	mcpToolName: string;
	piToolDescription: string;
	piToolPromptGuidelines?: readonly string[];
}): string {
	return [
		options.piToolDescription,
		formatPromptGuidelines(options.piToolPromptGuidelines),
		`Call MCP name ${options.mcpToolName} (pi tool: ${options.piToolName}). Full tool-surface rules are in the session bootstrap prompt.`,
	].filter((line): line is string => line !== undefined).join("\n");
}
