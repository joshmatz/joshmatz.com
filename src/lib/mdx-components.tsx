import { AITransformationLevels } from '~/components/agents-arent-the-hard-part/AITransformationLevels'
import { BugFlowVisualization } from '~/components/agents-arent-the-hard-part/BugFlowVisualization'
import {
  ClaudeArtifactsDiff,
  ClaudeMaturityModel,
  ClaudeProjectContext,
  ClaudeUsageDepthChart,
} from '~/components/claude-team-tour/ClaudeTeamTourVisuals'
import { AgentLoopVisualization } from '~/components/applied-ai-isnt-magic/AgentLoopVisualization'
import { PromptCachingVisualization } from '~/components/applied-ai-isnt-magic/PromptCachingVisualization'
import { TokensContextVisualization } from '~/components/applied-ai-isnt-magic/TokensContextVisualization'

export const componentRegistry: Record<string, React.ComponentType> = {
  AITransformationLevels,
  BugFlowVisualization,
  ClaudeArtifactsDiff,
  ClaudeMaturityModel,
  ClaudeProjectContext,
  ClaudeUsageDepthChart,
  TokensContextVisualization,
  AgentLoopVisualization,
  PromptCachingVisualization,
}
