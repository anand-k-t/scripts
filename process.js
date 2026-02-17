// ===== RECEIVE DATA FROM SHORTCUT =====
let input = args.shortcutParameter;

let selectedDate = new Date(input.date);
let sleepSeconds = input.sleepSeconds;
let totalSteps = input.steps;

// ===== FORMAT DATE =====
let formattedDate = selectedDate.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});

// ===== FORMAT SLEEP =====
let hours = Math.floor(sleepSeconds / 3600);
let minutes = Math.floor((sleepSeconds % 3600) / 60);

let sleepText = `${hours} hrs ${minutes} mins`;

// ===== RETURN CLEAN RESULT =====
let result = {
  date: formattedDate,
  sleep: sleepText,
  steps: totalSteps
};

Script.setShortcutOutput(result);
Script.complete();
