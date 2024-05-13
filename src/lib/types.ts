export type Roles = 'ADMIN' | 'USER' | 'GUEST';

export type AssignTimeKeeping = {
  id: number;
  employee:Employee;
  timeKeeping: TimeKeeping;
  payroll: {
    id: number
  };
  hoursWorked: string;
  type: string;
  workDate: string;
}

export type TimeKeeping ={
  id: string;
  description: string;
  dailyWorkHourStart: string;
  dailyWorkHourEnd: string;
}

export type AdjustmentData = {
  id: string;
  type: string;
  category : string;
  name: string;
  amount: string;
  remarks: string;
  createdAt: string;
  lastUpdated: string;
}

export type User = {
  id: number;
  email: string;
  password: string;
  role: string;
}

export type Department = {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  lastUpdated: string;
};
  
export type Designation = {
  id: number;
  designationName: string;
  breakHourLimit: Number;
  leavelimit: Number;
  limitHolyDay: Number;
  status: string,
  createdAt: string;
  lastUpdated: string;
};

export type EmployeeData = {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  birthday: string;
  contact: string;
  email: string;
  gender: string;
  // Full Address
  addressLine: string;
  barangay: string;
  country: string;
  province: string;
  createdAt: string;
  lastUpdated: string;
};

export type Employee = {
  id: number;
  empNum: string;
  department: Department;
  designation: Designation;
  employeeData: EmployeeData;
  employeeType: string;
  bankAccountDetails: string;
  hourlyRate: number;
  philhealth: String;
  socialSecurity: String;
  employementStartDate: String;
  employementEndDate: String;
  taxIdentification: String;
  user: UserAcc;
  status: string;
  createdAt: string;
  lastUpdated: string;
};

export type UserAcc = {
  id: number;
  email: string;
  password: string;
  role: string;
}

export type Signatory = {
  id: number;
  name: string;
  employee: Employee;
  status: string;
  createdAt: string;
  lastUpdated: string;
};

export type Payroll = {
  id: number;
  signatory: Signatory;
  employee: Employee[];
  start: string;
  end: string;
  payrollFrequency: string;
  payrollDate: String;
  status: string;
  createdAt: string;
  lastUpdated: string;
};

export type Payslip = {
  id: number,
  payroll: Payroll,
  issued_date: Date,
  total_earnings: Number,
  total_deductions:  Number,
  net_pay: Number,
  create_at: string,
  last_updated: string,
}

export type LeaveRequest = {
  id: number,
  name: string,
  comment: string,
  created_at: Date,
  dateOfLeave: Date,
  dateOfEnd: Date,
  last_updated: Date,
  leaveType: string,
  status: string,
  employee: Employee,
}

export type Payhead = {
  id: number;
  amount: string;
  created_at: string;
  last_updated: string;
  name: string;
  type: string;
};

export type AssignPayhead = {
  id: number,
  created_at: Date,
  last_updated: Date,
  amount: string,
  description: string,
  payhead: Payhead,
  employee: Employee
}