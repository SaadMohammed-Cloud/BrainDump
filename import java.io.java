import java.io.*;
import java.util.Scanner;

public class IOExercises {

    public static void main(String[] args) {
        // You can uncomment these to run them individually
        // readFile();
        // processNumbers();
        // writeLog();
        // analyzeFile("Words.txt");
    }

    /**
     * Task 1: File Reader [cite: 4, 5, 6, 7]
     */
    public static void readFile() {
        String fileName = "Words.txt"; // 
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) { // 
            String line; // [cite: 6]
            while ((line = reader.readLine()) != null) { // [cite: 7]
                System.out.println(line); // [cite: 7]
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }

    /**
     * Task 2: Number Example [cite: 10, 11, 12, 13]
     */
    public static void processNumbers() {
        String fileName = "Numbers.txt"; // 
        try (Scanner scanner = new Scanner(new File(fileName))) { // 
            System.out.println("Updated Numbers"); // [cite: 13]
            while (scanner.hasNextDouble()) { // [cite: 12]
                double oldNum = scanner.nextDouble(); // [cite: 12]
                double newNum = oldNum + 5.34; // [cite: 12]
                System.out.printf("Old: %.2f New: %.2f%n", oldNum, newNum); // [cite: 13]
            }
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        }
    }

    /**
     * Task 3: File Writer [cite: 14, 15, 16, 17, 18, 19]
     */
    public static void writeLog() {
        Scanner userInput = new Scanner(System.in); // [cite: 15]
        System.out.print("Enter name: ");
        String name = userInput.nextLine(); // [cite: 16]
        System.out.print("Enter task: ");
        String task = userInput.nextLine(); // [cite: 16]

        // 'true' in FileWriter constructor enables appending [cite: 17, 18]
        try (FileWriter fw = new FileWriter("log.txt", true);
             PrintWriter out = new PrintWriter(fw)) {
            out.println("User: " + name + " | Goal: " + task); // [cite: 19]
            System.out.println("Entry added to log.txt");
        } catch (IOException e) {
            System.out.println("Error writing to file: " + e.getMessage());
        }
    }

    /**
     * Task 4: File Analysis [cite: 20, 21, 22, 23]
     */
    public static void analyzeFile(String fileName) { // [cite: 21]
        int lineCount = 0, wordCount = 0, charCount = 0; // [cite: 21]

        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) { // [cite: 22]
            String line;
            while ((line = reader.readLine()) != null) { // [cite: 23]
                lineCount++; // [cite: 23]
                charCount += line.length(); // [cite: 23]
                
                // Split by whitespace to count words
                String[] words = line.trim().split("\\s+");
                if (!line.isEmpty()) {
                    wordCount += words.length; // [cite: 23]
                }
            }
            System.out.println("Lines: " + lineCount);
            System.out.println("Words: " + wordCount);
            System.out.println("Characters: " + charCount);
        } catch (IOException e) {
            System.out.println("Error analyzing file: " + e.getMessage());
        }
    }
}