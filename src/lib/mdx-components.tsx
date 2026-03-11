import { AITransformationLevels } from '~/components/agents-arent-the-hard-part/AITransformationLevels'
import { BugFlowVisualization } from '~/components/agents-arent-the-hard-part/BugFlowVisualization'
import {
  ClaudeArtifactsDiff,
  ClaudeMaturityModel,
  ClaudeProjectContext,
  ClaudeUsageDepthChart,
} from '~/components/claude-team-tour/ClaudeTeamTourVisuals'

export const componentRegistry: Record<string, React.ComponentType> = {
  AITransformationLevels,
  BugFlowVisualization,
  ClaudeArtifactsDiff,
  ClaudeMaturityModel,
  ClaudeProjectContext,
  ClaudeUsageDepthChart,
}
