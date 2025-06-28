// 'use server';

/**
 * @fileOverview Generates smart reply suggestions based on the current conversation.
 *
 * - generateSmartReplySuggestions - A function that generates smart reply suggestions.
 * - GenerateSmartReplySuggestionsInput - The input type for the generateSmartReplySuggestions function.
 * - GenerateSmartReplySuggestionsOutput - The return type for the generateSmartReplySuggestions function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSmartReplySuggestionsInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The recent conversation history to generate smart reply suggestions from.'),
  currentMessage: z.string().describe('The current message to respond to.'),
});
export type GenerateSmartReplySuggestionsInput = z.infer<
  typeof GenerateSmartReplySuggestionsInputSchema
>;

const GenerateSmartReplySuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of smart reply suggestions.'),
});
export type GenerateSmartReplySuggestionsOutput = z.infer<
  typeof GenerateSmartReplySuggestionsOutputSchema
>;

export async function generateSmartReplySuggestions(
  input: GenerateSmartReplySuggestionsInput
): Promise<GenerateSmartReplySuggestionsOutput> {
  return generateSmartReplySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSmartReplySuggestionsPrompt',
  input: {schema: GenerateSmartReplySuggestionsInputSchema},
  output: {schema: GenerateSmartReplySuggestionsOutputSchema},
  prompt: `You are a helpful chat assistant.  Given the following conversation history and current message, generate 3 smart reply suggestions.

Conversation History:
{{{conversationHistory}}}

Current Message:
{{{currentMessage}}}

Suggestions:`,
});

const generateSmartReplySuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSmartReplySuggestionsFlow',
    inputSchema: GenerateSmartReplySuggestionsInputSchema,
    outputSchema: GenerateSmartReplySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Split the suggestions into an array of strings
    if (output && output.suggestions) {
      return {
        suggestions: output.suggestions,
      };
    } else {
      return {
        suggestions: [],
      };
    }
  }
);
