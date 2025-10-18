'use server';

/**
 * @fileOverview Provides personalized feedback and tips on ride performance and route efficiency.
 *
 * - analyzeRideAndSuggest - A function that analyzes ride data and suggests improvements.
 * - RideAnalysisInput - The input type for the analyzeRideAndSuggest function.
 * - RideAnalysisOutput - The return type for the analyzeRideAndSuggest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RideAnalysisInputSchema = z.object({
  rideData: z.string().describe('The ride data including speed, distance, time, elevation, and GPS coordinates.'),
  weatherConditions: z.string().describe('The weather conditions during the ride, including temperature, wind speed, and precipitation.'),
  scooterModel: z.string().describe('The e-scooter model used for the ride.'),
});
export type RideAnalysisInput = z.infer<typeof RideAnalysisInputSchema>;

const RideAnalysisOutputSchema = z.object({
  suggestions: z.string().describe('Personalized feedback and tips on how to improve riding habits and optimize routes.'),
});
export type RideAnalysisOutput = z.infer<typeof RideAnalysisOutputSchema>;

export async function analyzeRideAndSuggest(input: RideAnalysisInput): Promise<RideAnalysisOutput> {
  return analyzeRideAndSuggestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rideAnalysisPrompt',
  input: {schema: RideAnalysisInputSchema},
  output: {schema: RideAnalysisOutputSchema},
  prompt: `You are an AI-powered ride analyst providing personalized feedback and tips on ride performance and route efficiency.

  Analyze the ride data, weather conditions, and scooter model to provide actionable suggestions for improving riding habits and optimizing routes.

  Ride Data: {{{rideData}}}
  Weather Conditions: {{{weatherConditions}}}
  Scooter Model: {{{scooterModel}}}

  Provide clear and concise suggestions in a conversational tone.
`,
});

const analyzeRideAndSuggestFlow = ai.defineFlow(
  {
    name: 'analyzeRideAndSuggestFlow',
    inputSchema: RideAnalysisInputSchema,
    outputSchema: RideAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
