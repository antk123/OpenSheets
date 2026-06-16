import * as XLSX from 'xlsx';
import type { SpreadsheetTemplate } from '@/data/templates';

const UK_EXPENSE_CATEGORIES = [
  'Advertising & Marketing',
  'Accountancy & Legal Fees',
  'Bank & Credit Card Charges',
  'Business Insurance',
  'Computer & Software',
  'Depreciation',
  'Entertaining (disallowable)',
  'Equipment Purchase',
  'Heat, Light & Power',
  'Mileage Costs',
  'Motor Expenses',
  'Office Rent',
  'Office Stationery',
  'Pension Costs',
  'Postage & Delivery',
  'Professional Subscriptions',
  'Rates / Council Tax',
  'Repairs & Maintenance',
  'Salaries & Wages',
  'Staff Training',
  'Telephone & Internet',
  'Travel & Subsistence',
  'Uniforms & PPE',
  'Website & Hosting',
  'Other Expenses',
];

const UK_INCOME_CATEGORIES = [
  'Sales - Products',
  'Sales - Services',
  'Consulting Income',
  'Commission Received',
  'Rental Income',
  'Interest Received',
  'Insurance Claims',
  'Other Income',
];

const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

export const generateCashBook = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  // ===== WELCOME / GUIDE SHEET =====
  const guideData = [
    ['', 'CASH BOOK & INCOME TRACKER', ''],
    ['', 'UK Small Business Bookkeeping Template', ''],
    ['', '', ''],
    ['', 'HOW TO USE THIS TEMPLATE', ''],
    ['', '1. The Monthly Sheets (Apr - Mar): Enter each transaction on a new row.', ''],
    ['', '   - Date: The date of the transaction', ''],
    ['', '   - Description: Who you paid or received from', ''],
    ['', '   - Category: Select from the dropdown list', ''],
    ['', '   - Amount: The transaction amount', ''],
    ['', '   - Bank Balance: Automatically calculated', ''],
    ['', '', ''],
    ['', '2. The Summary Sheet: Shows your totals for the year.', ''],
    ['', '   - Income and expenses are automatically summarised', ''],
    ['', '   - Profit/Loss is calculated for you', ''],
    ['', '', ''],
    ['', '3. Tips:', ''],
    ['', '   - Enter transactions in date order', ''],
    ['', '   - Use the same categories consistently', ''],
    ['', '   - Reconcile with your bank statement monthly', ''],
    ['', '   - Keep all receipts and invoices', ''],
    ['', '', ''],
    ['', 'This template uses a UK tax year (April to March).', ''],
    ['', 'You can change the month names to match your own accounting year.', ''],
  ];
  const wsGuide = XLSX.utils.aoa_to_sheet(guideData);
  wsGuide['!cols'] = [{ wch: 3 }, { wch: 70 }, { wch: 3 }];
  XLSX.utils.book_append_sheet(wb, wsGuide, 'Welcome');

  // ===== SUMMARY SHEET =====
  const summaryData = [
    ['', 'INCOME & EXPENSE SUMMARY', 'UK Tax Year April - March'],
    ['', '', ''],
    ['', 'INCOME', ''],
    ['', 'Category', ...MONTHS, 'TOTAL'],
    ...UK_INCOME_CATEGORIES.map((cat, i) => ['', cat, ...MONTHS.map((_, m) => ({ f: `='${MONTHS[m]}'!${String.fromCharCode(66 + i)}100` })), { f: `=SUM(D${5 + i}:O${5 + i})` }]),
    ['', 'TOTAL INCOME', ...MONTHS.map(() => ({ f: `=SUM(D${5}:D${5 + UK_INCOME_CATEGORIES.length - 1})` })), { f: `=SUM(D${5 + UK_INCOME_CATEGORIES.length}:O${5 + UK_INCOME_CATEGORIES.length})` }],
    ['', '', ''],
    ['', 'EXPENSES', ''],
    ['', 'Category', ...MONTHS, 'TOTAL'],
    ...UK_EXPENSE_CATEGORIES.map((cat, i) => ['', cat, ...MONTHS.map((_, m) => ({ f: `='${MONTHS[m]}'!${String.fromCharCode(66 + i)}200` })), { f: `=SUM(D${9 + UK_INCOME_CATEGORIES.length + 1 + i}:O${9 + UK_INCOME_CATEGORIES.length + 1 + i})` }]),
    ['', 'TOTAL EXPENSES', ...MONTHS.map(() => ({ f: `=SUM(D${9 + UK_INCOME_CATEGORIES.length + 1}:D${9 + UK_INCOME_CATEGORIES.length + 1 + UK_EXPENSE_CATEGORIES.length - 1})` })), { f: `=SUM(D${9 + UK_INCOME_CATEGORIES.length + 1 + UK_EXPENSE_CATEGORIES.length}:O${9 + UK_INCOME_CATEGORIES.length + 1 + UK_EXPENSE_CATEGORIES.length})` }],
    ['', '', ''],
    ['', 'NET PROFIT/(LOSS)', ...MONTHS.map((_, m) => ({ f: `=${String.fromCharCode(68 + m)}${5 + UK_INCOME_CATEGORIES.length}-${String.fromCharCode(68 + m)}${9 + UK_INCOME_CATEGORIES.length + 1 + UK_EXPENSE_CATEGORIES.length}` })), { f: `=D${9 + UK_INCOME_CATEGORIES.length + 1 + UK_EXPENSE_CATEGORIES.length + 2}-O${9 + UK_INCOME_CATEGORIES.length + 1 + UK_EXPENSE_CATEGORIES.length + 2}` }],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary['!cols'] = [{ wch: 3 }, { wch: 32 }, ...MONTHS.map(() => ({ wch: 12 })), { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

  // ===== MONTHLY SHEETS =====
  MONTHS.forEach((month) => {
    const monthData = [
      ['', `${month} 2025/26`, 'Cash Book'],
      ['', '', ''],
      ['', 'Date', 'Description', 'Category', 'Income', 'Expense', 'Bank Balance'],
      ['', 'EXAMPLE:', 'Opening Balance', '', '', '', 1000],
      ['', new Date(2025, 3, 1), 'Sales Invoice #001', 'Sales - Services', 500, '', { f: '=G4+E5-F5' }],
      ['', new Date(2025, 3, 2), 'Office Supplies Ltd', 'Office Stationery', '', 45.67, { f: '=G5+E6-F6' }],
      ['', new Date(2025, 3, 3), 'Client Payment - ABC Ltd', 'Sales - Services', 1200, '', { f: '=G6+E7-F7' }],
      ['', new Date(2025, 3, 5), 'British Telecom', 'Telephone & Internet', '', 59.99, { f: '=G7+E8-F8' }],
      ['', new Date(2025, 3, 7), 'Business Insurance Renewal', 'Business Insurance', '', 285, { f: '=G8+E9-F9' }],
      ['', new Date(2025, 3, 10), 'Coffee Shop Meeting', 'Entertaining (disallowable)', '', 12.5, { f: '=G9+E10-F10' }],
      ['', new Date(2025, 3, 12), 'Amazon - Laptop', 'Equipment Purchase', '', 899, { f: '=G10+E11-F11' }],
      ['', '', ''],
      ['', 'ADD YOUR TRANSACTIONS BELOW:', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ];
    const wsMonth = XLSX.utils.aoa_to_sheet(monthData);
    wsMonth['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 30 }, { wch: 28 }, { wch: 14 }, { wch: 14 }, { wch: 16 }];
    XLSX.utils.book_append_sheet(wb, wsMonth, month);
  });

  // ===== BANK RECONCILIATION =====
  const reconData = [
    ['', 'BANK RECONCILIATION', ''],
    ['', 'Month: _______________', ''],
    ['', '', ''],
    ['', 'Balance per Cash Book', { f: "='Apr'!G100" }],
    ['', 'Add: Deposits not yet cleared', ''],
    ['', 'Less: Cheques/ payments not yet cleared', ''],
    ['', 'Add/Less: Bank errors', ''],
    ['', 'BALANCE PER BANK STATEMENT', { f: '=D4+D5-D6+D7' }],
    ['', '', ''],
    ['', 'Actual Bank Statement Balance', ''],
    ['', 'DIFFERENCE (should be zero)', { f: '=D8-D10' }],
  ];
  const wsRecon = XLSX.utils.aoa_to_sheet(reconData);
  wsRecon['!cols'] = [{ wch: 3 }, { wch: 45 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsRecon, 'Bank Reconciliation');

  return wb;
};

export const generateCashBookWithBalanceSheet = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const guideData = [
    ['', 'CASH BOOK WITH BALANCE SHEET', ''],
    ['', 'Complete UK Small Business Bookkeeping Template', ''],
    ['', '', ''],
    ['', 'This template includes:', ''],
    ['', '1. Monthly Cash Book sheets (Apr - Mar)', ''],
    ['', '2. Profit & Loss Summary', ''],
    ['', '3. Balance Sheet', ''],
    ['', '', ''],
    ['', 'The Balance Sheet shows:', ''],
    ['', '- ASSETS: What your business owns (cash, equipment, stock)', ''],
    ['', '- LIABILITIES: What your business owes (loans, credit cards)', ''],
    ['', '- EQUITY: Your stake in the business', ''],
    ['', '', ''],
    ['', 'Assets = Liabilities + Equity (must always balance)', ''],
  ];
  const wsGuide = XLSX.utils.aoa_to_sheet(guideData);
  wsGuide['!cols'] = [{ wch: 3 }, { wch: 70 }, { wch: 3 }];
  XLSX.utils.book_append_sheet(wb, wsGuide, 'Welcome');

  // P&L Summary
  const plData = [
    ['', 'PROFIT & LOSS STATEMENT', 'Year ended 31 March 2026'],
    ['', '', ''],
    ['', 'INCOME', ''],
    ...UK_INCOME_CATEGORIES.map((cat) => ['', cat, '']),
    ['', 'TOTAL INCOME', { f: `=SUM(C4:C${3 + UK_INCOME_CATEGORIES.length})` }],
    ['', '', ''],
    ['', 'EXPENSES', ''],
    ...UK_EXPENSE_CATEGORIES.map((cat) => ['', cat, '']),
    ['', 'TOTAL EXPENSES', { f: `=SUM(C${6 + UK_INCOME_CATEGORIES.length + 1}:C${5 + UK_INCOME_CATEGORIES.length + 1 + UK_EXPENSE_CATEGORIES.length})` }],
    ['', '', ''],
    ['', 'NET PROFIT/(LOSS) FOR THE YEAR', { f: `=C${4 + UK_INCOME_CATEGORIES.length}-C${6 + UK_INCOME_CATEGORIES.length + UK_EXPENSE_CATEGORIES.length}` }],
  ];
  const wsPL = XLSX.utils.aoa_to_sheet(plData);
  wsPL['!cols'] = [{ wch: 3 }, { wch: 38 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsPL, 'Profit & Loss');

  // Balance Sheet
  const bsData = [
    ['', 'BALANCE SHEET', 'As at 31 March 2026'],
    ['', '', ''],
    ['', 'FIXED ASSETS', ''],
    ['', 'Equipment & Machinery', ''],
    ['', 'Furniture & Fixtures', ''],
    ['', 'Computer Equipment', ''],
    ['', 'Motor Vehicles', ''],
    ['', 'Less: Accumulated Depreciation', ''],
    ['', 'NET FIXED ASSETS', { f: '=SUM(C4:C7)-C8' }],
    ['', '', ''],
    ['', 'CURRENT ASSETS', ''],
    ['', 'Cash at Bank', ''],
    ['', 'Cash in Hand', ''],
    ['', 'Debtors (Money Owed)', ''],
    ['', 'Stock/Inventory', ''],
    ['', 'Prepayments', ''],
    ['', 'TOTAL CURRENT ASSETS', { f: '=SUM(C11:C15)' }],
    ['', '', ''],
    ['', 'TOTAL ASSETS', { f: '=C9+C16' }],
    ['', '', ''],
    ['', 'CURRENT LIABILITIES', ''],
    ['', 'Bank Overdraft', ''],
    ['', 'Creditors (Money Owed)', ''],
    ['', 'Accruals', ''],
    ['', 'VAT Liability', ''],
    ['', 'TOTAL CURRENT LIABILITIES', { f: '=SUM(C21:C24)' }],
    ['', '', ''],
    ['', 'LONG-TERM LIABILITIES', ''],
    ['', 'Bank Loans', ''],
    ['', 'Hire Purchase', ''],
    ['', 'Director/Owner Loans', ''],
    ['', 'TOTAL LONG-TERM LIABILITIES', { f: '=SUM(C28:C30)' }],
    ['', '', ''],
    ['', 'TOTAL LIABILITIES', { f: '=C25+C31' }],
    ['', '', ''],
    ['', 'NET ASSETS', { f: '=C19-C33' }],
    ['', '', ''],
    ['', 'EQUITY', ''],
    ['', 'Capital Introduced', ''],
    ['', 'Retained Earnings (brought forward)', ''],
    ['', 'Profit/(Loss) for the Year', { f: "='Profit & Loss'!C" + (6 + UK_INCOME_CATEGORIES.length + UK_EXPENSE_CATEGORIES.length) }],
    ['', 'Drawings/Dividends', ''],
    ['', 'TOTAL EQUITY', { f: '=SUM(C37:C39)-C40' }],
    ['', '', ''],
    ['', 'Check: Net Assets should equal Total Equity', { f: '=C35-C41' }],
  ];
  const wsBS = XLSX.utils.aoa_to_sheet(bsData);
  wsBS['!cols'] = [{ wch: 3 }, { wch: 42 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsBS, 'Balance Sheet');

  // Monthly sheets
  MONTHS.forEach((month) => {
    const monthData = [
      ['', `${month} 2025/26`, 'Cash Book'],
      ['', '', ''],
      ['', 'Date', 'Description', 'Category', 'Income', 'Expense', 'Bank Balance'],
      ['', 'Opening Balance', '', '', '', '', 1000],
      ['', new Date(2025, 3, 1), 'Sales Invoice #001', 'Sales - Services', 500, '', { f: '=G4+E5-F5' }],
      ['', new Date(2025, 3, 2), 'Office Supplies Ltd', 'Office Stationery', '', 45.67, { f: '=G5+E6-F6' }],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ];
    const wsMonth = XLSX.utils.aoa_to_sheet(monthData);
    wsMonth['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 30 }, { wch: 28 }, { wch: 14 }, { wch: 14 }, { wch: 16 }];
    XLSX.utils.book_append_sheet(wb, wsMonth, month);
  });

  return wb;
};

export const generateSelfEmployedLog = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const guideData = [
    ['', 'SELF-EMPLOYED INCOME & EXPENSE LOG', ''],
    ['', 'For Sole Traders and Freelancers', ''],
    ['', '', ''],
    ['', 'HOW TO USE:', ''],
    ['', '1. Record ALL your business income and expenses in the All Transactions sheet', ''],
    ['', '2. Categorise each transaction using the dropdown menus', ''],
    ['', '3. The Summary sheet automatically calculates your totals', ''],
    ['', '4. Use the figures for your Self Assessment tax return', ''],
    ['', '', ''],
    ['', 'TIPS:', ''],
    ['', '- Record transactions regularly (weekly or monthly)', ''],
    ['', '- Keep all receipts and invoices for 5 years', ''],
    ['', '- Use the Notes column to record what you bought', ''],
    ['', '- Round to the nearest pound - HMRC allows this', ''],
  ];
  const wsGuide = XLSX.utils.aoa_to_sheet(guideData);
  wsGuide['!cols'] = [{ wch: 3 }, { wch: 75 }, { wch: 3 }];
  XLSX.utils.book_append_sheet(wb, wsGuide, 'Welcome');

  // All Transactions
  const allTxData = [
    ['', 'ALL TRANSACTIONS', ''],
    ['', 'Tax Year: 2025/26 (6 Apr 2025 - 5 Apr 2026)', ''],
    ['', '', ''],
    ['', 'Date', 'Source', 'Description', 'Category', 'Amount', 'Notes'],
    ['', new Date(2025, 3, 6), 'Bank', 'Client A - Website Design', 'Turnover / Sales', 2500, 'Invoice #001'],
    ['', new Date(2025, 3, 7), 'Bank', 'HMRC Self Assessment Payment', 'Tax', 450, 'On account'],
    ['', new Date(2025, 3, 10), 'Card', 'W H Smith', 'Office stationery', 23.99, 'Printer paper & pens'],
    ['', new Date(2025, 3, 12), 'Cash', 'Taxi to client meeting', 'Travel', 18.5, 'Receipt kept'],
    ['', new Date(2025, 3, 15), 'Bank', 'Client B - Monthly Retainer', 'Turnover / Sales', 800, 'Invoice #002'],
    ['', new Date(2025, 3, 18), 'Card', 'Slack Subscription', 'Software', 12.5, 'Monthly'],
    ['', new Date(2025, 3, 20), 'Bank', 'Client C - Logo Design', 'Turnover / Sales', 650, 'Invoice #003'],
    ['', new Date(2025, 3, 22), 'Card', 'Train to London meeting', 'Travel', 89.6, 'Return ticket'],
    ['', new Date(2025, 3, 25), 'Bank', 'Accountant - Annual Fee', 'Accountancy', 600, 'Receipt received'],
    ['', new Date(2025, 3, 28), 'Card', 'WeWork Day Pass', 'Use of home office', 35, 'Co-working space'],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
  ];
  const wsAllTx = XLSX.utils.aoa_to_sheet(allTxData);
  wsAllTx['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 12 }, { wch: 32 }, { wch: 28 }, { wch: 14 }, { wch: 30 }];
  XLSX.utils.book_append_sheet(wb, wsAllTx, 'All Transactions');

  // Summary
  const summaryCategories = [
    'Turnover / Sales',
    'Cost of goods sold',
    'Car/van/travel expenses',
    'Wages & salaries',
    'Insurance',
    'Rent/rates/utilities',
    'Repairs/renewals',
    'Phone/internet/postage',
    'Printing/stationery',
    'Advertising/marketing',
    'Interest & bank charges',
    'Legal/professional fees',
    'Bad debts',
    'Entertaining',
    'Motor expenses',
    'Use of home office',
    'Depreciation',
    'Other expenses',
  ];
  const summaryData = [
    ['', 'INCOME & EXPENSE SUMMARY', '2025/26 Tax Year'],
    ['', '', ''],
    ['', 'Category', 'Total Amount'],
    ...summaryCategories.map((cat) => ['', cat, '']),
    ['', '', ''],
    ['', 'TOTAL TURNOVER', { f: '=C4' }],
    ['', 'TOTAL EXPENSES', { f: `=SUM(C5:C${3 + summaryCategories.length})` }],
    ['', 'NET PROFIT', { f: '=C22-C23' }],
    ['', '', ''],
    ['', 'ESTIMATED TAX (20%)', { f: '=MAX(C24*0.2,0)' }],
    ['', 'ESTIMATED CLASS 4 NIC (9% above £12,570)', { f: '=MAX((C24-12570)*0.09,0)' }],
    ['', 'ESTIMATED TOTAL TAX & NIC', { f: '=C26+C27' }],
    ['', '', ''],
    ['', 'Tax year 2025/26 thresholds:', ''],
    ['', 'Personal Allowance', 12570],
    ['', 'Basic Rate (20%) up to', 50270],
    ['', 'Class 4 NIC threshold', 12570],
    ['', 'Class 4 NIC rate (9%)', '9%'],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary['!cols'] = [{ wch: 3 }, { wch: 38 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

  return wb;
};

export const generateRentalProperty = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const guideData = [
    ['', 'RENTAL PROPERTY INCOME & EXPENSES', ''],
    ['', 'For UK Landlords - Up to 5 Properties', ''],
    ['', '', ''],
    ['', 'HOW TO USE:', ''],
    ['', '1. List your properties on the Property Details sheet', ''],
    ['', '2. Record all rent received and expenses per property', ''],
    ['', '3. The Summary sheet calculates profit per property and total', ''],
    ['', '', ''],
    ['', 'IMPORTANT NOTES:', ''],
    ['', '- Mortgage interest is now restricted to 20% tax relief', ''],
    ['', '- Wear & Tear allowance replaced by Replacement Relief', ''],
    ['', '- Keep all receipts for repairs and maintenance', ''],
    ['', '- Record rent deposits separately (not income)', ''],
    ['', '- Agent fees are fully deductible', ''],
  ];
  const wsGuide = XLSX.utils.aoa_to_sheet(guideData);
  wsGuide['!cols'] = [{ wch: 3 }, { wch: 65 }, { wch: 3 }];
  XLSX.utils.book_append_sheet(wb, wsGuide, 'Welcome');

  // Property Details
  const propDetails = [
    ['', 'PROPERTY DETAILS', ''],
    ['', '', ''],
    ['', 'Property', 'Address', 'Purchase Date', 'Purchase Price', 'Current Value', 'Mortgage Lender', 'Monthly Mortgage'],
    ['', 'Property 1', '12 High Street, London', '15/03/2018', 285000, 340000, 'Nationwide', 850],
    ['', 'Property 2', '3 Oak Avenue, Manchester', '22/08/2019', 175000, 195000, 'Halifax', 520],
    ['', 'Property 3', '', '', '', '', '', ''],
    ['', 'Property 4', '', '', '', '', '', ''],
    ['', 'Property 5', '', '', '', '', '', ''],
  ];
  const wsProp = XLSX.utils.aoa_to_sheet(propDetails);
  wsProp['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 32 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 20 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsProp, 'Property Details');

  // Income & Expenses
  const ieData = [
    ['', 'INCOME & EXPENSES', ''],
    ['', 'Tax Year: 2025/26', ''],
    ['', '', ''],
    ['', 'Date', 'Property', 'Type', 'Description', 'Amount', 'Category', 'Notes'],
    ['', new Date(2025, 3, 1), 'Property 1', 'Income', 'Monthly Rent - Tenant A', 1200, 'Rental Income', 'Bank transfer'],
    ['', new Date(2025, 3, 1), 'Property 2', 'Income', 'Monthly Rent - Tenant B', 850, 'Rental Income', 'Standing order'],
    ['', new Date(2025, 3, 2), 'Property 1', 'Expense', 'Agent Fee (10%)', 120, 'Agent Fees', 'Letting agent'],
    ['', new Date(2025, 3, 3), 'Property 1', 'Expense', 'Buildings Insurance', 45, 'Insurance', 'Annual premium / 12'],
    ['', new Date(2025, 3, 5), 'Property 1', 'Expense', 'Plumber - Leak Repair', 185, 'Repairs & Maintenance', 'Receipt #456'],
    ['', new Date(2025, 3, 10), 'Property 2', 'Expense', 'Council Tax', 145, 'Council Tax', 'Monthly'],
    ['', new Date(2025, 3, 12), 'Property 2', 'Expense', 'Gas Safety Certificate', 65, 'Safety Certificates', 'Annual check'],
    ['', new Date(2025, 3, 15), 'Property 1', 'Income', 'Monthly Rent - Tenant A', 1200, 'Rental Income', ''],
    ['', new Date(2025, 3, 15), 'Property 2', 'Expense', 'Mortgage Interest', 420, 'Mortgage Interest', 'Only interest is recorded'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
  ];
  const wsIE = XLSX.utils.aoa_to_sheet(ieData);
  wsIE['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 14 }, { wch: 12 }, { wch: 30 }, { wch: 14 }, { wch: 28 }, { wch: 24 }];
  XLSX.utils.book_append_sheet(wb, wsIE, 'Income & Expenses');

  // Annual Summary
  const summaryData = [
    ['', 'ANNUAL SUMMARY', '2025/26 Tax Year'],
    ['', '', ''],
    ['', '', 'Property 1', 'Property 2', 'Property 3', 'Property 4', 'Property 5', 'TOTAL'],
    ['', 'RENTAL INCOME', '', '', '', '', '', { f: '=SUM(D4:H4)' }],
    ['', 'Agent Fees', '', '', '', '', '', { f: '=SUM(D5:H5)' }],
    ['', 'Insurance', '', '', '', '', '', { f: '=SUM(D6:H6)' }],
    ['', 'Repairs & Maintenance', '', '', '', '', '', { f: '=SUM(D7:H7)' }],
    ['', 'Council Tax', '', '', '', '', '', { f: '=SUM(D8:H8)' }],
    ['', 'Utility Bills', '', '', '', '', '', { f: '=SUM(D9:H9)' }],
    ['', 'Mortgage Interest', '', '', '', '', '', { f: '=SUM(D10:H10)' }],
    ['', 'Safety Certificates', '', '', '', '', '', { f: '=SUM(D11:H11)' }],
    ['', 'Cleaning & Gardening', '', '', '', '', '', { f: '=SUM(D12:H12)' }],
    ['', 'Legal & Professional', '', '', '', '', '', { f: '=SUM(D13:H13)' }],
    ['', 'Advertising', '', '', '', '', '', { f: '=SUM(D14:H14)' }],
    ['', 'Accountancy', '', '', '', '', '', { f: '=SUM(D15:H15)' }],
    ['', 'Other Expenses', '', '', '', '', '', { f: '=SUM(D16:H16)' }],
    ['', '', '', '', '', '', '', ''],
    ['', 'TOTAL EXPENSES', { f: '=SUM(D5:D16)' }, { f: '=SUM(E5:E16)' }, { f: '=SUM(F5:F16)' }, { f: '=SUM(G5:G16)' }, { f: '=SUM(H5:H16)' }, { f: '=SUM(D18:H18)' }],
    ['', '', '', '', '', '', '', ''],
    ['', 'TAXABLE PROFIT/(LOSS)', { f: '=D4-D18' }, { f: '=E4-E18' }, { f: '=F4-F18' }, { f: '=G4-G18' }, { f: '=H4-H18' }, { f: '=I4-I18' }],
    ['', '', '', '', '', '', '', ''],
    ['', 'Mortgage Interest Tax Relief (20%)', { f: '=D10*0.2' }, { f: '=E10*0.2' }, { f: '=F10*0.2' }, { f: '=G10*0.2' }, { f: '=H10*0.2' }, { f: '=SUM(D21:H21)' }],
    ['', '', '', '', '', '', '', ''],
    ['', 'ESTIMATED TAX (20% of profit)', { f: '=MAX(D19*0.2,0)' }, { f: '=MAX(E19*0.2,0)' }, { f: '=MAX(F19*0.2,0)' }, { f: '=MAX(G19*0.2,0)' }, { f: '=MAX(H19*0.2,0)' }, { f: '=SUM(D23:H23)' }],
    ['', 'Less: Mortgage Interest Relief', { f: '=-D21' }, { f: '=-E21' }, { f: '=-F21' }, { f: '=-G21' }, { f: '=-H21' }, { f: '=SUM(D24:H24)' }],
    ['', 'ESTIMATED TAX PAYABLE', { f: '=D23+D24' }, { f: '=E23+E24' }, { f: '=F23+F24' }, { f: '=G23+G24' }, { f: '=H23+H24' }, { f: '=I23+I24' }],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary['!cols'] = [{ wch: 3 }, { wch: 36 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Annual Summary');

  return wb;
};

export const generateVATReturn = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const guideData = [
    ['', 'VAT RETURN CALCULATOR', ''],
    ['', 'For UK VAT-Registered Businesses', ''],
    ['', '', ''],
    ['', 'HOW TO USE:', ''],
    ['', '1. Enter your sales invoices in the Sales sheet', ''],
    ['', '2. Enter your purchase invoices in the Purchases sheet', ''],
    ['', '3. The VAT Return sheet calculates all 9 boxes automatically', ''],
    ['', '', ''],
    ['', 'IMPORTANT:', ''],
    ['', 'Current UK VAT rate: 20% (standard)', ''],
    ['', 'VAT registration threshold: £85,000 turnover', ''],
    ['', 'Flat Rate Scheme: Use the alternative summary sheet', ''],
  ];
  const wsGuide = XLSX.utils.aoa_to_sheet(guideData);
  wsGuide['!cols'] = [{ wch: 3 }, { wch: 65 }, { wch: 3 }];
  XLSX.utils.book_append_sheet(wb, wsGuide, 'Welcome');

  // Sales
  const salesData = [
    ['', 'SALES INVOICES', 'VAT Quarter: Q1 2026 (Jan - Mar)'],
    ['', '', ''],
    ['', 'Date', 'Invoice No', 'Customer', 'Description', 'Net Amount', 'VAT @ 20%', 'Gross Amount'],
    ['', new Date(2026, 0, 5), 'INV-1001', 'ABC Ltd', 'Consulting Services', 2500, { f: '=F5*0.2' }, { f: '=F5+G5' }],
    ['', new Date(2026, 0, 12), 'INV-1002', 'XYZ Ltd', 'Website Design', 1800, { f: '=F6*0.2' }, { f: '=F6+G6' }],
    ['', new Date(2026, 0, 18), 'INV-1003', 'Smith & Co', 'Monthly Retainer', 950, { f: '=F7*0.2' }, { f: '=F7+G7' }],
    ['', new Date(2026, 1, 3), 'INV-1004', 'Green Ltd', 'Training Course', 1200, { f: '=F8*0.2' }, { f: '=F8+G8' }],
    ['', new Date(2026, 1, 15), 'INV-1005', 'ABC Ltd', 'Additional Work', 750, { f: '=F9*0.2' }, { f: '=F9+G9' }],
    ['', new Date(2026, 2, 8), 'INV-1006', 'Brown & Sons', 'Project Work', 3200, { f: '=F10*0.2' }, { f: '=F10+G10' }],
    ['', '', '', '', 'TOTALS', { f: '=SUM(F5:F10)' }, { f: '=SUM(G5:G10)' }, { f: '=SUM(H5:H10)' }],
  ];
  const wsSales = XLSX.utils.aoa_to_sheet(salesData);
  wsSales['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 14 }, { wch: 22 }, { wch: 26 }, { wch: 14 }, { wch: 14 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsSales, 'Sales');

  // Purchases
  const purchData = [
    ['', 'PURCHASE INVOICES', 'VAT Quarter: Q1 2026 (Jan - Mar)'],
    ['', '', ''],
    ['', 'Date', 'Invoice No', 'Supplier', 'Description', 'Net Amount', 'VAT @ 20%', 'Gross Amount'],
    ['', new Date(2026, 0, 8), 'SUP-0451', 'Office Supplies Co', 'Stationery', 85.5, { f: '=F5*0.2' }, { f: '=F5+G5' }],
    ['', new Date(2026, 0, 15), 'SUP-0452', 'Vodafone', 'Phone & Broadband', 120, { f: '=F6*0.2' }, { f: '=F6+G6' }],
    ['', new Date(2026, 0, 22), 'SUP-0453', 'Amazon Business', 'Laptop', 899, { f: '=F7*0.2' }, { f: '=F7+G7' }],
    ['', new Date(2026, 1, 5), 'SUP-0454', 'British Gas', 'Utilities', 245, { f: '=F8*0.2' }, { f: '=F8+G8' }],
    ['', new Date(2026, 1, 14), 'SUP-0455', 'Accountant Ltd', 'Bookkeeping', 350, { f: '=F9*0.2' }, { f: '=F9+G9' }],
    ['', new Date(2026, 2, 2), 'SUP-0456', 'WeWork', 'Office Space', 280, { f: '=F10*0.2' }, { f: '=F10+G10' }],
    ['', '', '', '', 'TOTALS', { f: '=SUM(F5:F10)' }, { f: '=SUM(G5:G10)' }, { f: '=SUM(H5:H10)' }],
  ];
  const wsPurch = XLSX.utils.aoa_to_sheet(purchData);
  wsPurch['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 14 }, { wch: 22 }, { wch: 26 }, { wch: 14 }, { wch: 14 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsPurch, 'Purchases');

  // VAT Return
  const vatData = [
    ['', 'VAT RETURN', 'Quarter: Q1 2026'],
    ['', '', ''],
    ['', 'BOX 1', 'VAT due on sales', { f: "='Sales'!G11" }],
    ['', 'BOX 2', 'VAT due on acquisitions from EU', 0],
    ['', 'BOX 3', 'Total VAT due (Box 1 + Box 2)', { f: '=D4+D5' }],
    ['', '', '', ''],
    ['', 'BOX 4', 'VAT reclaimed on purchases', { f: "='Purchases'!G11" }],
    ['', 'BOX 5', 'NET VAT to pay/reclaim (Box 3 - Box 4)', { f: '=D6-D8' }],
    ['', '', '', ''],
    ['', 'BOX 6', 'Total value of sales (ex VAT)', { f: "='Sales'!F11" }],
    ['', 'BOX 7', 'Total value of purchases (ex VAT)', { f: "='Purchases'!F11" }],
    ['', 'BOX 8', 'Total value of EU sales (ex VAT)', 0],
    ['', 'BOX 9', 'Total value of EU purchases (ex VAT)', 0],
    ['', '', '', ''],
    ['', 'VAT PAYMENT DUE', { f: '=D9' }],
    ['', '', ''],
    ['', 'DEADLINE', '7 May 2026 (1 month + 7 days after quarter end)'],
  ];
  const wsVAT = XLSX.utils.aoa_to_sheet(vatData);
  wsVAT['!cols'] = [{ wch: 3 }, { wch: 10 }, { wch: 42 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsVAT, 'VAT Return');

  // Flat Rate Scheme
  const flatData = [
    ['', 'FLAT RATE SCHEME', 'Quarter: Q1 2026'],
    ['', '', ''],
    ['', 'Your Flat Rate Percentage', ''],
    ['', '(Check your sector rate at gov.uk)', ''],
    ['', '', ''],
    ['', 'Total VAT-inclusive turnover', { f: "='Sales'!H11" }],
    ['', 'Flat Rate %', { f: '=C3' }],
    ['', 'VAT PAYABLE under Flat Rate', { f: '=C6*(C7/100)' }],
    ['', '', ''],
    ['', 'VAT PAID on purchases', { f: "='Purchases'!G11" }],
    ['', '(Not reclaimable under Flat Rate)', ''],
    ['', '', ''],
    ['', 'ADVANTAGE/DISADVANTAGE', { f: '=C10-C8' }],
    ['', '(Positive = standard scheme better)', ''],
  ];
  const wsFlat = XLSX.utils.aoa_to_sheet(flatData);
  wsFlat['!cols'] = [{ wch: 3 }, { wch: 42 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsFlat, 'Flat Rate Scheme');

  return wb;
};

export const generateInvoiceTemplate = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const invoiceData = [
    ['', '', '', '', '', ''],
    ['', 'TAX INVOICE', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', 'YOUR BUSINESS NAME', '', '', 'Invoice Number:', 'INV-_______'],
    ['', 'Your Address Line 1', '', '', 'Date:', ''],
    ['', 'Your Address Line 2', '', '', 'Due Date:', ''],
    ['', 'Your Town, Postcode', '', '', '', ''],
    ['', 'Tel: _______________', '', '', '', ''],
    ['', 'Email: _______________', '', '', '', ''],
    ['', 'VAT Reg No: _______________', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', 'BILL TO:', '', '', '', ''],
    ['', 'Customer Name', '', '', '', ''],
    ['', 'Customer Address', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', 'Description', 'Qty', 'Rate', 'Amount', ''],
    ['', '', '', '', '', ''],
    ['', 'Example: Consulting Services', 10, 75, { f: '=C18*D18' }, ''],
    ['', 'Example: Travel Costs', 1, 45, { f: '=C19*D19' }, ''],
    ['', 'Example: Materials', 2, 25, { f: '=C20*D20' }, ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', 'SUBTOTAL', { f: '=SUM(E17:E22)' }, ''],
    ['', '', '', 'VAT @ 20%', { f: '=E23*0.2' }, ''],
    ['', '', '', 'TOTAL DUE', { f: '=E23+E24' }, ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', 'Payment Terms: 30 days from invoice date', '', '', '', ''],
    ['', 'Bank: ____________________', '', '', '', ''],
    ['', 'Sort Code: __________ Account: __________', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', 'Thank you for your business!', '', '', '', ''],
  ];
  const wsInvoice = XLSX.utils.aoa_to_sheet(invoiceData);
  wsInvoice['!cols'] = [{ wch: 3 }, { wch: 40 }, { wch: 10 }, { wch: 14 }, { wch: 14 }, { wch: 3 }];
  XLSX.utils.book_append_sheet(wb, wsInvoice, 'Invoice');

  return wb;
};

export const generateExpenseTracker = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const data = [
    ['', 'BUSINESS EXPENSE TRACKER', '2025/26 Tax Year'],
    ['', '', ''],
    ['', 'Date', 'Vendor/Supplier', 'Description', 'Category', 'Amount', 'Payment Method', 'Receipt Ref', 'Allowable?'],
    ['', new Date(2025, 3, 5), 'W H Smith', 'Printer paper, pens, envelopes', 'Office stationery', 34.5, 'Business Card', 'WH-001', 'Yes'],
    ['', new Date(2025, 3, 8), 'Vodafone', 'Monthly phone & broadband', 'Telephone & Internet', 59.99, 'Direct Debit', 'VF-2026-04', 'Yes'],
    ['', new Date(2025, 3, 10), 'Client Lunch', 'Lunch with prospective client', 'Entertaining', 45.8, 'Personal Card', 'R-042', 'No - entertaining disallowable'],
    ['', new Date(2025, 3, 12), 'Shell Petrol', 'Business mileage - client visit', 'Motor expenses', 48.25, 'Business Card', 'SH-089', 'Yes'],
    ['', new Date(2025, 3, 15), 'HMRC', 'Self Assessment Payment on Account', 'Tax', 500, 'Bank Transfer', 'HMRC-REF', 'No - tax not deductible'],
    ['', new Date(2025, 3, 18), 'WeWork', 'Hot desk day pass', 'Use of home office', 35, 'Business Card', 'WW-156', 'Yes'],
    ['', new Date(2025, 3, 20), 'Trainline', 'Return train to London meeting', 'Travel', 89.6, 'Personal Card', 'TL-789', 'Yes'],
    ['', new Date(2025, 3, 22), 'Sage', 'Accounting software subscription', 'Software', 30, 'Direct Debit', 'SG-2026', 'Yes'],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
  ];
  const wsData = XLSX.utils.aoa_to_sheet(data);
  wsData['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 22 }, { wch: 32 }, { wch: 24 }, { wch: 14 }, { wch: 16 }, { wch: 14 }, { wch: 28 }];
  XLSX.utils.book_append_sheet(wb, wsData, 'Expenses');

  // Summary by Category
  const summaryData = [
    ['', 'EXPENSE SUMMARY BY CATEGORY', ''],
    ['', '', ''],
    ['', 'Category', 'Total', '% of Total'],
    ...UK_EXPENSE_CATEGORIES.map((cat, i) => ['', cat, { f: `=SUMIF('Expenses'!E:E,B${4 + i},'Expenses'!F:F)` }, { f: `=IF(C${4 + i}>0,C${4 + i}/SUM(C$4:C${3 + UK_EXPENSE_CATEGORIES.length}),0)` }]),
    ['', '', ''],
    ['', 'TOTAL EXPENSES', { f: `=SUM(C4:C${3 + UK_EXPENSE_CATEGORIES.length})` }],
    ['', '', ''],
    ['', 'ALLOWABLE EXPENSES ONLY', { f: `=SUMIFS('Expenses'!F:F,'Expenses'!I:I,"*Yes*")` }],
    ['', 'DISALLOWABLE EXPENSES', { f: `=SUMIFS('Expenses'!F:F,'Expenses'!I:I,"*No*")` }],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary['!cols'] = [{ wch: 3 }, { wch: 32 }, { wch: 16 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

  return wb;
};

export const generateProfitLoss = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const plData = [
    ['', 'PROFIT & LOSS STATEMENT', ''],
    ['', '[Your Business Name]', ''],
    ['', 'For the year ended 31 March 2026', ''],
    ['', '', ''],
    ['', 'TURNOVER / SALES', ''],
    ['', 'Product Sales', ''],
    ['', 'Service Income', ''],
    ['', 'Other Income', ''],
    ['', 'TOTAL TURNOVER', { f: '=SUM(C6:C8)' }],
    ['', '', ''],
    ['', 'COST OF SALES', ''],
    ['', 'Materials & Stock', ''],
    ['', 'Direct Labour', ''],
    ['', 'Subcontractor Costs', ''],
    ['', 'TOTAL COST OF SALES', { f: '=SUM(C12:C14)' }],
    ['', '', ''],
    ['', 'GROSS PROFIT', { f: '=C9-C15' }],
    ['', 'Gross Profit Margin', { f: '=IF(C9>0,C17/C9,0)' }],
    ['', '', ''],
    ['', 'OVERHEADS / OPERATING EXPENSES', ''],
    ['', 'Rent & Rates', ''],
    ['', 'Utilities (Gas, Electric, Water)', ''],
    ['', 'Telephone & Internet', ''],
    ['', 'Insurance', ''],
    ['', 'Office Supplies', ''],
    ['', 'Marketing & Advertising', ''],
    ['', 'Travel & Subsistence', ''],
    ['', 'Motor Expenses', ''],
    ['', 'Repairs & Maintenance', ''],
    ['', 'Professional Fees', ''],
    ['', 'Bank & Finance Charges', ''],
    ['', 'Training & Development', ''],
    ['', 'Computer & Software', ''],
    ['', 'Depreciation', ''],
    ['', 'Other Expenses', ''],
    ['', 'TOTAL OVERHEADS', { f: '=SUM(C21:C35)' }],
    ['', '', ''],
    ['', 'NET PROFIT/(LOSS) BEFORE TAX', { f: '=C17-C36' }],
    ['', '', ''],
    ['', 'TAX', ''],
    ['', 'Corporation Tax / Income Tax', ''],
    ['', '', ''],
    ['', 'NET PROFIT/(LOSS) AFTER TAX', { f: '=C38-C40' }],
  ];
  const wsPL = XLSX.utils.aoa_to_sheet(plData);
  wsPL['!cols'] = [{ wch: 3 }, { wch: 42 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsPL, 'Profit & Loss');

  // Monthly Comparison
  const monthlyData = [
    ['', 'MONTHLY COMPARISON', ''],
    ['', '', ''],
    ['', '', ...MONTHS, 'TOTAL'],
    ['', 'Turnover', ...MONTHS.map(() => ''), { f: '=SUM(D5:O5)' }],
    ['', 'Cost of Sales', ...MONTHS.map(() => ''), { f: '=SUM(D6:O6)' }],
    ['', 'Gross Profit', ...MONTHS.map((_, i) => ({ f: `=${String.fromCharCode(68 + i)}5-${String.fromCharCode(68 + i)}6` })), { f: '=SUM(D7:O7)' }],
    ['', 'Overheads', ...MONTHS.map(() => ''), { f: '=SUM(D8:O8)' }],
    ['', 'Net Profit', ...MONTHS.map((_, i) => ({ f: `=${String.fromCharCode(68 + i)}7-${String.fromCharCode(68 + i)}8` })), { f: '=SUM(D9:O9)' }],
  ];
  const wsMonthly = XLSX.utils.aoa_to_sheet(monthlyData);
  wsMonthly['!cols'] = [{ wch: 3 }, { wch: 18 }, ...MONTHS.map(() => ({ wch: 12 })), { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsMonthly, 'Monthly');

  return wb;
};

export const generateBalanceSheet = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const bsData = [
    ['', 'BALANCE SHEET', ''],
    ['', '[Your Business Name]', ''],
    ['', 'As at 31 March 2026', ''],
    ['', '', ''],
    ['', 'FIXED ASSETS', 'Notes', ''],
    ['', 'Tangible Assets', '', ''],
    ['', '  Land & Buildings', '', ''],
    ['', '  Plant & Machinery', '', ''],
    ['', '  Fixtures & Fittings', '', ''],
    ['', '  Computer Equipment', '', ''],
    ['', '  Motor Vehicles', '', ''],
    ['', 'Less: Accumulated Depreciation', '', ''],
    ['', 'Net Tangible Fixed Assets', '', { f: '=SUM(D7:D11)-D12' }],
    ['', '', '', ''],
    ['', 'Intangible Assets', '', ''],
    ['', '  Goodwill', '', ''],
    ['', '  Intellectual Property', '', ''],
    ['', 'Net Intangible Assets', '', { f: '=D15+D16' }],
    ['', '', '', ''],
    ['', 'TOTAL FIXED ASSETS', '', { f: '=D13+D17' }],
    ['', '', '', ''],
    ['', 'CURRENT ASSETS', '', ''],
    ['', 'Stock / Inventory', '', ''],
    ['', 'Trade Debtors', '', ''],
    ['', 'Cash at Bank', '', ''],
    ['', 'Cash in Hand', '', ''],
    ['', 'Prepayments', '', ''],
    ['', 'TOTAL CURRENT ASSETS', '', { f: '=SUM(D22:D26)' }],
    ['', '', '', ''],
    ['', 'TOTAL ASSETS', '', { f: '=D19+D27' }],
    ['', '', '', ''],
    ['', 'CURRENT LIABILITIES', '', ''],
    ['', 'Bank Overdraft', '', ''],
    ['', 'Trade Creditors', '', ''],
    ['', 'Accruals', '', ''],
    ['', 'VAT Liability', '', ''],
    ['', 'PAYE/NI Liability', '', ''],
    ['', 'Corporation Tax Due', '', ''],
    ['', 'Short-term Loans', '', ''],
    ['', 'TOTAL CURRENT LIABILITIES', '', { f: '=SUM(D32:D38)' }],
    ['', '', '', ''],
    ['', 'LONG-TERM LIABILITIES', '', ''],
    ['', 'Bank Loans', '', ''],
    ['', 'Hire Purchase', '', ''],
    ['', 'Director/Owner Loans', '', ''],
    ['', 'Mortgages', '', ''],
    ['', 'TOTAL LONG-TERM LIABILITIES', '', { f: '=SUM(D41:D44)' }],
    ['', '', '', ''],
    ['', 'TOTAL LIABILITIES', '', { f: '=D39+D45' }],
    ['', '', '', ''],
    ['', 'NET ASSETS', '', { f: '=D29-D46' }],
    ['', '', '', ''],
    ['', 'EQUITY', '', ''],
    ['', 'Called-up Share Capital', '', ''],
    ['', 'Share Premium', '', ''],
    ['', 'Retained Earnings - Brought Forward', '', ''],
    ['', 'Profit/(Loss) for the Year', '', ''],
    ['', 'Drawings/Dividends', '', ''],
    ['', 'TOTAL EQUITY', '', { f: '=D51+D52+D53+D54-D55' }],
    ['', '', '', ''],
    ['', 'CHECK: Net Assets should equal Total Equity', '', { f: '=D48-D56' }],
  ];
  const wsBS = XLSX.utils.aoa_to_sheet(bsData);
  wsBS['!cols'] = [{ wch: 3 }, { wch: 40 }, { wch: 10 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsBS, 'Balance Sheet');

  return wb;
};

export const generateBudgetForecast = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const budgetData = [
    ['', '12-MONTH BUDGET FORECAST', 'Year: 2025/26'],
    ['', '', ''],
    ['', '', ...MONTHS, 'TOTAL'],
    ['', 'INCOME', ...MONTHS.map(() => ''), ''],
    ['', 'Sales - Products', ...MONTHS.map(() => ''), { f: '=SUM(D5:O5)' }],
    ['', 'Sales - Services', ...MONTHS.map(() => ''), { f: '=SUM(D6:O6)' }],
    ['', 'Other Income', ...MONTHS.map(() => ''), { f: '=SUM(D7:O7)' }],
    ['', 'TOTAL INCOME', ...MONTHS.map((_, i) => ({ f: `=${String.fromCharCode(68 + i)}5+${String.fromCharCode(68 + i)}6+${String.fromCharCode(68 + i)}7` })), { f: '=SUM(D8:O8)' }],
    ['', '', ...MONTHS.map(() => ''), ''],
    ['', 'EXPENSES', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', 'Rent & Rates', ...MONTHS.map(() => ''), { f: '=SUM(D10:O10)' }],
    ['', 'Utilities', ...MONTHS.map(() => ''), { f: '=SUM(D11:O11)' }],
    ['', 'Insurance', ...MONTHS.map(() => ''), { f: '=SUM(D12:O12)' }],
    ['', 'Telephone & Internet', ...MONTHS.map(() => ''), { f: '=SUM(D13:O13)' }],
    ['', 'Office Supplies', ...MONTHS.map(() => ''), { f: '=SUM(D14:O14)' }],
    ['', 'Marketing', ...MONTHS.map(() => ''), { f: '=SUM(D15:O15)' }],
    ['', 'Travel & Subsistence', ...MONTHS.map(() => ''), { f: '=SUM(D16:O16)' }],
    ['', 'Motor Expenses', ...MONTHS.map(() => ''), { f: '=SUM(D17:O17)' }],
    ['', 'Professional Fees', ...MONTHS.map(() => ''), { f: '=SUM(D18:O18)' }],
    ['', 'Software & Subscriptions', ...MONTHS.map(() => ''), { f: '=SUM(D19:O19)' }],
    ['', 'Staff Costs', ...MONTHS.map(() => ''), { f: '=SUM(D20:O20)' }],
    ['', 'Other Expenses', ...MONTHS.map(() => ''), { f: '=SUM(D21:O21)' }],
    ['', 'TOTAL EXPENSES', ...MONTHS.map((_, i) => ({ f: `=SUM(${String.fromCharCode(68 + i)}10:${String.fromCharCode(68 + i)}21)` })), { f: '=SUM(D22:O22)' }],
    ['', '', ...MONTHS.map(() => ''), ''],
    ['', 'NET PROFIT/(LOSS)', ...MONTHS.map((_, i) => ({ f: `=${String.fromCharCode(68 + i)}8-${String.fromCharCode(68 + i)}22` })), { f: '=SUM(D24:O24)' }],
    ['', '', ...MONTHS.map(() => ''), ''],
    ['', 'OPENING BANK BALANCE', 0, ...MONTHS.slice(0, 11).map((_, i) => ({ f: `=${String.fromCharCode(68 + i)}27+${String.fromCharCode(68 + i)}24` }))],
    ['', 'CLOSING BANK BALANCE', ...MONTHS.map((_, i) => ({ f: `=${String.fromCharCode(68 + i)}27+${String.fromCharCode(68 + i)}24` })), { f: '=O27' }],
  ];
  const wsBudget = XLSX.utils.aoa_to_sheet(budgetData);
  wsBudget['!cols'] = [{ wch: 3 }, { wch: 32 }, ...MONTHS.map(() => ({ wch: 12 })), { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsBudget, 'Budget');

  // Actual vs Budget
  const vsData = [
    ['', 'ACTUAL vs BUDGET', ''],
    ['', '', ''],
    ['', '', 'Budget', 'Actual', 'Variance', '%'],
    ['', 'INCOME', '', '', '', ''],
    ['', 'Sales - Products', '', '', { f: '=D5-E5' }, { f: '=IF(D5>0,E5/D5,0)' }],
    ['', 'Sales - Services', '', '', { f: '=D6-E6' }, { f: '=IF(D6>0,E6/D6,0)' }],
    ['', 'TOTAL INCOME', { f: '=SUM(D5:D6)' }, { f: '=SUM(E5:E6)' }, { f: '=D7-E7' }, { f: '=IF(D7>0,E7/D7,0)' }],
    ['', '', '', '', '', ''],
    ['', 'EXPENSES', '', '', '', ''],
    ['', 'Rent & Rates', '', '', { f: '=D9-E9' }, ''],
    ['', 'Utilities', '', '', { f: '=D10-E10' }, ''],
    ['', 'Insurance', '', '', { f: '=D11-E11' }, ''],
    ['', 'Telephone & Internet', '', '', { f: '=D12-E12' }, ''],
    ['', 'Office Supplies', '', '', { f: '=D13-E13' }, ''],
    ['', 'Marketing', '', '', { f: '=D14-E14' }, ''],
    ['', 'Professional Fees', '', '', { f: '=D15-E15' }, ''],
    ['', 'Other', '', '', { f: '=D16-E16' }, ''],
    ['', 'TOTAL EXPENSES', { f: '=SUM(D9:D16)' }, { f: '=SUM(E9:E16)' }, { f: '=D17-E17' }, ''],
    ['', '', '', '', '', ''],
    ['', 'NET PROFIT', { f: '=D7-D17' }, { f: '=E7-E17' }, { f: '=D19-E19' }, { f: '=IF(D19>0,E19/D19,0)' }],
  ];
  const wsVs = XLSX.utils.aoa_to_sheet(vsData);
  wsVs['!cols'] = [{ wch: 3 }, { wch: 28 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, wsVs, 'Actual vs Budget');

  return wb;
};

export const generateMileageLog = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const guideData = [
    ['', 'BUSINESS MILEAGE LOG', ''],
    ['', 'HMRC-Compliant Mileage Tracker', ''],
    ['', '', ''],
    ['', 'HMRC APPROVED RATES (2025/26):', ''],
    ['', 'First 10,000 business miles: 45p per mile', ''],
    ['', 'Over 10,000 business miles: 25p per mile', ''],
    ['', 'Passengers: 5p per mile per passenger', ''],
    ['', '', ''],
    ['', 'IMPORTANT:', ''],
    ['', '- Only count BUSINESS journeys (not commuting)', ''],
    ['', '- Keep a log for at least 5 years', ''],
    ['', '- Record start and end points', ''],
    ['', '- Note the business purpose', ''],
  ];
  const wsGuide = XLSX.utils.aoa_to_sheet(guideData);
  wsGuide['!cols'] = [{ wch: 3 }, { wch: 65 }, { wch: 3 }];
  XLSX.utils.book_append_sheet(wb, wsGuide, 'Welcome');

  // Mileage Log
  const logData = [
    ['', 'MILEAGE LOG', '2025/26 Tax Year'],
    ['', '', ''],
    ['', 'Date', 'Vehicle', 'From', 'To', 'Purpose', 'Miles', 'Passengers'],
    ['', new Date(2025, 3, 5), 'Ford Focus', 'Home', 'ABC Ltd, Manchester', 'Client meeting', 24, 0],
    ['', new Date(2025, 3, 8), 'Ford Focus', 'Home', 'Leeds', 'Site visit', 42, 1],
    ['', new Date(2025, 3, 12), 'Ford Focus', 'Home', 'Post Office', 'Business post', 3, 0],
    ['', new Date(2025, 3, 15), 'Ford Focus', 'Home', 'Training Centre, Liverpool', 'CPD Course', 65, 0],
    ['', new Date(2025, 3, 18), 'Ford Focus', 'Home', 'ABC Ltd, Manchester', 'Follow-up meeting', 24, 0],
    ['', new Date(2025, 3, 22), 'Ford Focus', 'Home', 'Bank', 'Business banking', 5, 0],
    ['', new Date(2025, 3, 25), 'Ford Focus', 'Home', 'XYZ Ltd, Birmingham', 'New client pitch', 86, 1],
    ['', '', '', '', '', 'MONTH TOTAL', { f: '=SUM(G5:G11)' }, ''],
    ['', '', '', '', '', '', '', ''],
  ];
  const wsLog = XLSX.utils.aoa_to_sheet(logData);
  wsLog['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 16 }, { wch: 18 }, { wch: 28 }, { wch: 28 }, { wch: 10 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, wsLog, 'Mileage Log');

  // Annual Summary
  const summaryData = [
    ['', 'ANNUAL MILEAGE SUMMARY', ''],
    ['', '', ''],
    ['', 'Month', 'Total Miles', 'Rate Applied', 'Claim Amount'],
    ['', 'April', '', { f: '=IF(C5<=10000,0.45,0.25)' }, { f: '=C5*D5' }],
    ['', 'May', '', { f: '=IF(C5+C6<=10000,0.45,0.25)' }, { f: '=C6*D6' }],
    ['', 'June', '', { f: '=IF(C5+C6+C7<=10000,0.45,0.25)' }, { f: '=C7*D7' }],
    ['', 'July', '', '', { f: '=C8*D8' }],
    ['', 'August', '', '', { f: '=C9*D9' }],
    ['', 'September', '', '', { f: '=C10*D10' }],
    ['', 'October', '', '', { f: '=C11*D11' }],
    ['', 'November', '', '', { f: '=C12*D12' }],
    ['', 'December', '', '', { f: '=C13*D13' }],
    ['', 'January', '', '', { f: '=C14*D14' }],
    ['', 'February', '', '', { f: '=C15*D15' }],
    ['', 'March', '', '', { f: '=C16*D16' }],
    ['', '', '', '', ''],
    ['', 'TOTALS', { f: '=SUM(C5:C16)' }, '', { f: '=SUM(E5:E16)' }],
    ['', '', '', '', ''],
    ['', 'Cumulative Miles', { f: '=C17' }, '', ''],
    ['', 'Rate for first 10,000 miles', 0.45, '', ''],
    ['', 'Rate over 10,000 miles', 0.25, '', ''],
    ['', '', '', '', ''],
    ['', 'CIS verification note: Keep this log for 5 years', '', '', ''],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 14 }, { wch: 16 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Annual Summary');

  return wb;
};

export const generateHomeOffice = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const guideData = [
    ['', 'HOME OFFICE EXPENSE CALCULATOR', ''],
    ['', 'For those working from home', ''],
    ['', '', ''],
    ['', 'TWO METHODS AVAILABLE:', ''],
    ['', '', ''],
    ['', 'METHOD 1: HMRC Simplified Rates', ''],
    ['', '25 hours+/month: £10/month', ''],
    ['', '51-100 hours/month: £18/month', ''],
    ['', '101+ hours/month: £26/month', ''],
    ['', '', ''],
    ['', 'METHOD 2: Actual Cost Basis', ''],
    ['', 'Calculate the business % of your actual home costs', ''],
    ['', 'Business % = (Office rooms / Total rooms) x (Office hours / Total hours)', ''],
    ['', '', ''],
    ['', 'Use this template to calculate under Method 2', ''],
  ];
  const wsGuide = XLSX.utils.aoa_to_sheet(guideData);
  wsGuide['!cols'] = [{ wch: 3 }, { wch: 70 }, { wch: 3 }];
  XLSX.utils.book_append_sheet(wb, wsGuide, 'Welcome');

  // Calculation
  const calcData = [
    ['', 'HOME OFFICE CALCULATION', '2025/26 Tax Year'],
    ['', '', ''],
    ['', 'YOUR HOME DETAILS', '', ''],
    ['', 'Total number of rooms in your home', '', ''],
    ['', 'Number of rooms used for business', '', ''],
    ['', 'Hours worked from home per week', '', ''],
    ['', 'Total hours in a week', 168, ''],
    ['', '', '', ''],
    ['', 'BUSINESS PERCENTAGE', '', ''],
    ['', 'Room percentage', { f: '=IF(D4>0,D5/D4,0)' }, '% of rooms used for business'],
    ['', 'Time percentage', { f: '=IF(D7>0,D6/D7,0)' }, '% of time used for business'],
    ['', 'Overall business %', { f: '=D10*D11' }, 'Apply this % to your bills below'],
    ['', '', '', ''],
    ['', 'ANNUAL HOME EXPENSES', 'Total Cost', 'Business %', 'Claimable Amount'],
    ['', 'Mortgage Interest (not capital)', '', { f: '=D12' }, { f: '=C15*D15' }],
    ['', 'Rent', '', { f: '=D12' }, { f: '=C16*D16' }],
    ['', 'Council Tax', '', { f: '=D12' }, { f: '=C17*D17' }],
    ['', 'Gas & Electricity', '', { f: '=D12' }, { f: '=C18*D18' }],
    ['', 'Water Rates', '', { f: '=D12' }, { f: '=C19*D19' }],
    ['', 'Buildings Insurance', '', { f: '=D12' }, { f: '=C20*D20' }],
    ['', 'Contents Insurance', '', { f: '=D12' }, { f: '=C21*D21' }],
    ['', 'Broadband / Internet', '', { f: '=D12' }, { f: '=C22*D22' }],
    ['', 'Cleaning', '', { f: '=D12' }, { f: '=C23*D23' }],
    ['', 'Repairs & Maintenance', '', { f: '=D12' }, { f: '=C24*D24' }],
    ['', '', '', '', ''],
    ['', 'TOTAL ANNUAL CLAIM', '', '', { f: '=SUM(E15:E24)' }],
    ['', '', '', '', ''],
    ['', 'SIMPLIFIED METHOD COMPARISON:', '', '', ''],
    ['', 'HMRC simplified rate (per month)', '', '', ''],
    ['', 'Annual simplified claim', { f: '=D29*12' }, '', ''],
    ['', '', '', '', ''],
    ['', 'WHICH IS BETTER?', '', '', ''],
    ['', 'Actual cost method', { f: '=E26' }, '', ''],
    ['', 'Simplified method', { f: '=D30' }, '', ''],
    ['', 'Best method', { f: '=IF(D33>D34,"Actual Cost","Simplified")' }, '', ''],
  ];
  const wsCalc = XLSX.utils.aoa_to_sheet(calcData);
  wsCalc['!cols'] = [{ wch: 3 }, { wch: 36 }, { wch: 16 }, { wch: 16 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsCalc, 'Calculation');

  return wb;
};

export const generatePettyCash = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const logData = [
    ['', 'PETTY CASH LOG', ''],
    ['', 'Month: _______________', ''],
    ['', 'Float Amount: £__________', ''],
    ['', '', ''],
    ['', 'Date', 'Description', 'Category', 'Money In', 'Money Out', 'Balance', 'Receipt No'],
    ['', 'Opening Balance', '', '', 100, '', 100, ''],
    ['', new Date(2025, 3, 5), 'Stamps', 'Postage', '', 12.5, { f: '=G6+E7-F7' }, 'R001'],
    ['', new Date(2025, 3, 8), 'Coffee & Milk', 'Refreshments', '', 8.35, { f: '=G7+E8-F8' }, 'R002'],
    ['', new Date(2025, 3, 10), 'Top-up from bank', 'Transfer', 50, '', { f: '=G8+E9-F9' }, 'BANK'],
    ['', new Date(2025, 3, 12), 'Taxi receipt', 'Travel', '', 14.2, { f: '=G9+E10-F10' }, 'R003'],
    ['', new Date(2025, 3, 15), 'Printer paper', 'Office supplies', '', 6.99, { f: '=G10+E11-F11' }, 'R004'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
  ];
  const wsLog = XLSX.utils.aoa_to_sheet(logData);
  wsLog['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 28 }, { wch: 20 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsLog, 'Petty Cash Log');

  // Voucher
  const voucherData = [
    ['', '', '', '', '', ''],
    ['', 'PETTY CASH VOUCHER', '', '', 'No: _______', ''],
    ['', '', '', '', '', ''],
    ['', 'Date: ____________________', '', '', '', ''],
    ['', 'Paid To: ____________________', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', 'Description of Expense:', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', 'Amount: £', '_______'],
    ['', '', '', '', '', ''],
    ['', 'Authorised By: ____________________', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', 'Signature: ____________________', '', '', '', ''],
  ];
  const wsVoucher = XLSX.utils.aoa_to_sheet(voucherData);
  wsVoucher['!cols'] = [{ wch: 3 }, { wch: 28 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsVoucher, 'Voucher');

  return wb;
};

export const generateBankReconciliation = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const reconData = [
    ['', 'BANK RECONCILIATION WORKSHEET', ''],
    ['', 'Bank Account: ____________________', ''],
    ['', 'Date: ____________________', ''],
    ['', '', ''],
    ['', 'Balance as per Cash Book', ''],
    ['', 'ADD:', ''],
    ['', '  Outstanding deposits (not yet on statement)', ''],
    ['', '  Bank errors in your favour', ''],
    ['', '  Interest received not recorded', ''],
    ['', 'SUBTOTAL', { f: '=C5+C7+C8+C9' }],
    ['', '', ''],
    ['', 'LESS:', ''],
    ['', '  Unpresented cheques / payments', ''],
    ['', '  Bank charges not recorded', ''],
    ['', '  Standing orders / DDs not recorded', ''],
    ['', '  Bank errors against you', ''],
    ['', 'SUBTOTAL', { f: '=C13+C14+C15+C16' }],
    ['', '', ''],
    ['', 'BALANCE AS PER BANK STATEMENT', { f: '=C10-C17' }],
    ['', '', ''],
    ['', 'Actual Bank Statement Balance', ''],
    ['', '', ''],
    ['', 'DIFFERENCE (should be zero)', { f: '=C18-C21' }],
    ['', '', ''],
    ['', 'Unreconciled Items:', '', ''],
    ['', 'Date', 'Description', 'Amount', 'Type'],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  const wsRecon = XLSX.utils.aoa_to_sheet(reconData);
  wsRecon['!cols'] = [{ wch: 3 }, { wch: 52 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsRecon, 'Reconciliation');

  return wb;
};

export const generateARLedger = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const arData = [
    ['', 'ACCOUNTS RECEIVABLE LEDGER', ''],
    ['', 'As at: ____________________', ''],
    ['', '', ''],
    ['', 'Invoice No', 'Date', 'Customer', 'Description', 'Amount', 'Date Paid', 'Amount Paid', 'Balance', 'Days Overdue', 'Notes'],
    ['', 'INV-001', new Date(2025, 0, 15), 'ABC Ltd', 'Website Design', 2500, new Date(2025, 1, 10), 2500, { f: '=F5-G5' }, { f: '=IF(H5>0,MAX(D5+30-G5,0),0)' }, 'Paid on time'],
    ['', 'INV-002', new Date(2025, 1, 1), 'XYZ Ltd', 'Consulting - Feb', 1200, '', '', { f: '=F6-G6' }, { f: '=IF(H6>0,MAX(D6+30-TODAY(),0),0)' }, 'Chase on 10th'],
    ['', 'INV-003', new Date(2025, 1, 15), 'Smith & Co', 'Monthly Retainer', 950, new Date(2025, 2, 20), 950, { f: '=F7-G7' }, { f: '=IF(H7>0,MAX(D7+30-G7,0),0)' }, 'Paid late'],
    ['', 'INV-004', new Date(2025, 2, 1), 'ABC Ltd', 'Additional Work', 750, '', '', { f: '=F8-G8' }, { f: '=IF(H8>0,MAX(D8+30-TODAY(),0),0)' }, 'Send reminder'],
    ['', 'INV-005', new Date(2025, 2, 10), 'Green Ltd', 'Training Course', 1800, '', '', { f: '=F9-G9' }, { f: '=IF(H9>0,MAX(D9+30-TODAY(),0),0)' }, 'New customer'],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
  ];
  const wsAR = XLSX.utils.aoa_to_sheet(arData);
  wsAR['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 14 }, { wch: 22 }, { wch: 24 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 12 }, { wch: 14 }, { wch: 24 }];
  XLSX.utils.book_append_sheet(wb, wsAR, 'A/R Ledger');

  // Summary
  const summaryData = [
    ['', 'RECEIVABLES SUMMARY', ''],
    ['', '', ''],
    ['', '', 'Amount'],
    ['', 'Total Invoiced', { f: "=SUM('A/R Ledger'!F:F)" }],
    ['', 'Total Received', { f: "=SUM('A/R Ledger'!G:G)" }],
    ['', 'Total Outstanding', { f: '=C4-C5' }],
    ['', '', ''],
    ['', 'AGING ANALYSIS', '', ''],
    ['', 'Current (not yet due)', { f: "=SUMIFS('A/R Ledger'!H:H,'A/R Ledger'!J:J,\"<=0\")" }],
    ['', '1-30 days overdue', ''],
    ['', '31-60 days overdue', ''],
    ['', '61-90 days overdue', ''],
    ['', '90+ days overdue', ''],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary['!cols'] = [{ wch: 3 }, { wch: 32 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

  return wb;
};

export const generateAPLedger = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  const apData = [
    ['', 'ACCOUNTS PAYABLE LEDGER', ''],
    ['', 'As at: ____________________', ''],
    ['', '', ''],
    ['', 'Bill No', 'Date', 'Supplier', 'Description', 'Amount', 'Due Date', 'Date Paid', 'Amount Paid', 'Balance', 'Status'],
    ['', 'BILL-001', new Date(2025, 3, 1), 'Office Supplies Co', 'Monthly stationery', 125, new Date(2025, 3, 31), new Date(2025, 3, 25), 125, { f: '=F5-I5' }, 'Paid'],
    ['', 'BILL-002', new Date(2025, 3, 5), 'Vodafone', 'Phone & Broadband', 59.99, new Date(2025, 3, 20), '', '', { f: '=F6-I6' }, 'Due 20th'],
    ['', 'BILL-003', new Date(2025, 3, 8), 'British Gas', 'Electricity Q1', 345, new Date(2025, 4, 8), '', '', { f: '=F7-I7' }, 'Upcoming'],
    ['', 'BILL-004', new Date(2025, 3, 10), 'Accountant Ltd', 'Annual fee', 1200, new Date(2025, 4, 10), '', '', { f: '=F8-I8' }, 'Upcoming'],
    ['', 'BILL-005', new Date(2025, 3, 12), 'Insurance Co', 'Public liability', 285, new Date(2025, 3, 30), '', '', { f: '=F9-I9' }, 'Due soon'],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', ''],
  ];
  const wsAP = XLSX.utils.aoa_to_sheet(apData);
  wsAP['!cols'] = [{ wch: 3 }, { wch: 14 }, { wch: 14 }, { wch: 24 }, { wch: 26 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 12 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsAP, 'A/P Ledger');

  // Summary
  const summaryData = [
    ['', 'PAYABLES SUMMARY', ''],
    ['', '', ''],
    ['', '', 'Amount'],
    ['', 'Total Bills', { f: "=SUM('A/P Ledger'!F:F)" }],
    ['', 'Total Paid', { f: "=SUM('A/P Ledger'!I:I)" }],
    ['', 'Total Outstanding', { f: '=C4-C5' }],
    ['', '', ''],
    ['', 'UPCOMING PAYMENTS (Next 30 Days)', '', ''],
    ['', 'Supplier', 'Due Date', 'Amount'],
    ['', '', '', ''],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary['!cols'] = [{ wch: 3 }, { wch: 38 }, { wch: 16 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

  return wb;
};

export const generateWorkbook = (template: SpreadsheetTemplate): XLSX.WorkBook => {
  switch (template.id) {
    case 'cash-book':
      return generateCashBook();
    case 'cash-book-balance':
      return generateCashBookWithBalanceSheet();
    case 'self-employed':
      return generateSelfEmployedLog();
    case 'rental-property':
      return generateRentalProperty();
    case 'vat-return':
      return generateVATReturn();
    case 'invoice-template':
      return generateInvoiceTemplate();
    case 'expense-tracker':
      return generateExpenseTracker();
    case 'profit-loss':
      return generateProfitLoss();
    case 'balance-sheet':
      return generateBalanceSheet();
    case 'budget-forecast':
      return generateBudgetForecast();
    case 'mileage-log':
      return generateMileageLog();
    case 'home-office':
      return generateHomeOffice();
    case 'petty-cash':
      return generatePettyCash();
    case 'bank-reconciliation':
      return generateBankReconciliation();
    case 'accounts-receivable':
      return generateARLedger();
    case 'accounts-payable':
      return generateAPLedger();
    default:
      return generateCashBook();
  }
};

// Templates with pre-built professionally styled files (openpyxl-generated)
const PREBUILT_TEMPLATES: Record<string, string> = {
  'vat-return': '/templates/VAT_Return_Calculator.xlsx',
  'rental-property': '/templates/Rental_Property_Tracker_5Property.xlsx',
  'mtd-quarterly-property': '/templates/MTD_Quarterly_Property_Income.xlsx',
  'cash-book': '/templates/Cash_Book_Income_Tracker.xlsx',
  'self-employed': '/templates/Self_Employed_Log.xlsx',
  'profit-loss': '/templates/Profit_Loss_Statement.xlsx',
  'balance-sheet': '/templates/Balance_Sheet_Template.xlsx',
  'budget-forecast': '/templates/Budget_Forecast_12Month.xlsx',
  'mileage-log': '/templates/Business_Mileage_Log.xlsx',
  'home-office': '/templates/Home_Office_Calculator.xlsx',
  'invoice-template': '/templates/Invoice_Template.xlsx',
  'expense-tracker': '/templates/Expense_Tracker.xlsx',
  'petty-cash': '/templates/Petty_Cash_Log.xlsx',
  'bank-reconciliation': '/templates/Bank_Reconciliation.xlsx',
  'accounts-receivable': '/templates/Accounts_Receivable.xlsx',
  'accounts-payable': '/templates/Accounts_Payable.xlsx',
};

export const downloadTemplate = async (template: SpreadsheetTemplate): Promise<void> => {
  // Check if a pre-built professional template exists
  const prebuiltPath = PREBUILT_TEMPLATES[template.id];
  if (prebuiltPath) {
    try {
      const response = await fetch(prebuiltPath);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = template.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        return;
      }
    } catch {
      // Fall through to dynamic generation
    }
  }

  // Fall back to dynamic generation
  const wb = generateWorkbook(template);
  XLSX.writeFile(wb, template.fileName);
};
