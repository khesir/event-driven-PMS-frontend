
export function calculateTotalPay(totalHoursWorked: number, type: string): number {
    let totalPay = 0;
    switch (type) {
        case "REGULAR":
            totalPay = calculateRegularPay(totalHoursWorked);
            break;
        case "OVERTIME":
            totalPay = calculateOvertimePay(totalHoursWorked);
            break;
        case "NIGHTSHIFT":
            totalPay = calculateNightShiftPay(totalHoursWorked);
            break;
        case "VACATION":
            totalPay = calculateVacationPay(totalHoursWorked);
            break;
        default:
            break;
    }
    return totalPay;
}

function calculateRegularPay(totalHoursWorked: number): number {
    // Assuming hourly rate for regular pay is stored somewhere
    const hourlyRate = 10; // Example hourly rate
    return totalHoursWorked * hourlyRate;
}

function calculateOvertimePay(totalHoursWorked: number): number {
    // Assuming overtime rate is stored somewhere
    const overtimeRate = 15; // Example overtime rate
    // const regularHours = 8; // Assuming 8 hours is regular time
    // const overtimeHours = totalHoursWorked > regularHours ? totalHoursWorked - regularHours : 0;
    return totalHoursWorked * overtimeRate;
}

function calculateNightShiftPay(totalHoursWorked: number): number {
    // Assuming night shift rate is stored somewhere
    const nightShiftRate = 12; // Example night shift rate
    const nightShiftHours = totalHoursWorked * 0.25; // Example: Night shift hours are 25% of total hours worked
    return nightShiftHours * nightShiftRate;
}

function calculateVacationPay(totalHoursWorked: number): number {
    // Assuming vacation rate is stored somewhere
    const vacationRate = 20; // Example vacation rate
    return totalHoursWorked * vacationRate;
}