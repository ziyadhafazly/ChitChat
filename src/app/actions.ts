"use server";

import {
  generateSmartReplySuggestions,
  type GenerateSmartReplySuggestionsInput,
} from "@/ai/flows/smart-reply-suggestions";

export async function getSmartReplies(
  input: GenerateSmartReplySuggestionsInput
): Promise<string[]> {
  try {
    const result = await generateSmartReplySuggestions(input);
    return result.suggestions || [];
  } catch (error) {
    console.error("Error generating smart replies:", error);
    // In a real app, you might want to handle this more gracefully
    return [];
  }
}
