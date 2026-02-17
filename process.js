// ===== INPUT DATE FROM SHORTCUT =====
let inputDate = args.shortcutParameter;
let selectedDate = inputDate ? new Date(inputDate) : new Date();

// ===== FORMAT DATE =====
let formattedDate = selectedDate.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});

// ===== SLEEP (Selected Date) =====
let startOfDay = new Date(selectedDate);
startOfDay.setHours(0,0,0,0);

let endOfDay = new Date(selectedDate);
endOfDay.setHours(23,59,59,999);

let sleepSamples = await Health.querySamples({
  type: "sleepAnalysis",
  startDate: startOfDay,
  endDate: endOfDay
});

let totalSleepSeconds = 0;

for (let s of sleepSamples) {
  if (s.value === "HKCategoryValueSleepAnalysisAsleep") {
    totalSleepSeconds += (s.endDate - s.startDate) / 1000;
  }
}

let sleepHours = Math.floor(totalSleepSeconds / 3600);
let sleepMinutes = Math.floor((totalSleepSeconds % 3600) / 60);

let sleepText = `${sleepHours} hrs ${sleepMinutes} mins`;

// ===== STEPS (Previous Day) =====
let stepsDate = new Date(selectedDate);
stepsDate.setDate(stepsDate.getDate() - 1);

let stepsStart = new Date(stepsDate);
stepsStart.setHours(0,0,0,0);

let stepsEnd = new Date(stepsDate);
stepsEnd.setHours(23,59,59,999);

let stepSamples = await Health.queryQuantitySamples({
  type: "stepCount",
  startDate: stepsStart,
  endDate: stepsEnd
});

let totalSteps = 0;
for (let s of stepSamples) {
  totalSteps += s.quantity;
}

// ===== RETURN RESULT =====
let result = {
  date: formattedDate,
  sleep: sleepText,
  steps: totalSteps
};

Script.setShortcutOutput(result);
Script.complete();
