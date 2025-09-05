import { evaluate } from "mathjs";

/**
 * Safely evaluate a mathematical expression.
 * @param expression The math expression as a string (e.g. "2+2", "sin(30 deg)")
 * @returns number or string with error
 */
export function calculate(expression: string): string {
  try {
    // Handle special constants
    expression = expression
      .replace(/π/g, 'pi')
      .replace(/e\b/g, 'e'); // Ensure 'e' is recognized as the constant
    
    // Handle factorial (mathjs uses exclamation mark for factorial)
    expression = expression.replace(/!$/g, '!');
    
    const result = evaluate(expression);
    
    // Format the result to avoid extremely long decimal numbers
    if (typeof result === 'number') {
      // Check if the number is an integer or needs formatting
      if (Number.isInteger(result)) {
        return result.toString();
      } else {
        // Round to 10 decimal places to avoid floating point precision issues
        return parseFloat(result.toFixed(10)).toString();
      }
    }
    
    return result.toString();
  } catch (error: unknown) {
    // Proper TypeScript error handling
    if (error instanceof Error) {
      console.error("Calculation error:", error.message);
    } else {
      console.error("Unknown calculation error:", error);
    }
    return "Error";
  }
}