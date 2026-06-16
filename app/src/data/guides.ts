export interface GuideSection {
  heading: string;
  content: string;
  bullets?: string[];
  callout?: { type: 'tip' | 'warning' | 'note'; text: string };
  table?: { headers: string[]; rows: string[][] };
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  category: 'bookkeeping' | 'tax' | 'mtd' | 'business' | 'expenses';
  readTime: string;
  lastUpdated: string;
  slug: string;
  sections: GuideSection[];
  relatedTemplates?: string[];
  relatedGuides?: string[];
  faq?: { question: string; answer: string }[];
}

export const guideCategories = [
  { id: 'bookkeeping', label: 'Bookkeeping', description: 'Core record-keeping skills for UK businesses' },
  { id: 'tax', label: 'Tax', description: 'VAT, Self Assessment, and property tax guides' },
  { id: 'mtd', label: 'Making Tax Digital', description: 'HMRC\'s digital tax transformation' },
  { id: 'business', label: 'Business Setup', description: 'Starting out and running your business' },
  { id: 'expenses', label: 'Expenses', description: 'What you can claim and how to record it' },
] as const;

export const guides: Guide[] = [
  // =====================================================
  //  GUIDE 1: What is Bookkeeping
  // =====================================================
  {
    id: 'what-is-bookkeeping',
    title: 'What Is Bookkeeping? A Plain-English Guide for UK Small Businesses',
    description: 'Bookkeeping explained simply. Learn what it is, why it matters, and how to get started without the jargon.',
    category: 'bookkeeping',
    readTime: '8 min read',
    lastUpdated: 'June 2026',
    slug: 'what-is-bookkeeping',
    relatedTemplates: ['cash-book', 'self-employed', 'cash-book-balance'],
    relatedGuides: ['sole-trader-guide', 'cash-vs-accrual', ' mtd-guide'],
    sections: [
      {
        heading: 'At a Glance',
        content: '',
        bullets: [
          'Bookkeeping means recording every financial transaction in your business',
          'Every UK business must do it \u2014 including sole traders and landlords',
          'Bookkeeping records what happens; accounting interprets it \u2014 they are not the same thing',
          'Basic tasks include recording income and expenses, managing money owed to you and by you, and checking your bank balance matches your records',
          'Good bookkeeping keeps you in control of your finances and makes tax time far less stressful',
          'You can do it yourself using a spreadsheet or a free template',
          'HMRC requires you to keep accurate financial records for at least 5 years',
        ],
      },
      {
        heading: 'What Is Bookkeeping?',
        content: `Bookkeeping is the process of recording, organising, and maintaining your business\'s financial transactions. Every time money enters or leaves your business \u2014 a customer pays an invoice, you buy supplies, you settle a bill \u2014 you need to record that transaction. Those records are your books.

It sounds formal, but it is really just organised note-taking. If you have ever kept a running total of your bank balance, written down what you spent on a shopping trip, or tracked who owes you money, you have already done a version of bookkeeping.

The difference for a business is that your records need to be complete, accurate, and kept for long enough to satisfy HMRC if they ever ask to see them. But the core idea is the same: know what came in, know what went out, and know where you stand.`,
      },
      {
        heading: 'Why Does Bookkeeping Matter?',
        content: `Good bookkeeping is not just about keeping HMRC happy (although that is important). It gives you a clear picture of how your business is actually doing. Without accurate records, you are running blind.

Here is what proper bookkeeping gives you:

**You know if you are making a profit.** This sounds obvious, but many business owners only find out at tax time whether they made money or lost money. Monthly bookkeeping tells you as you go.

**You catch problems early.** If a customer has not paid, a supplier overcharged you, or your expenses are creeping up, your books will show it.

**Tax time becomes simple.** With your records already organised, completing your Self Assessment takes hours rather than days. You will also claim every allowable expense, reducing your tax bill.

**You can plan ahead.** Want to buy new equipment, hire someone, or take less work next month? Your books give you the numbers to make that decision confidently.

**HMRC can check your records.** HMRC can ask to see your records going back several years. If they are complete and well-organised, an enquiry is a quick process. If they are missing or chaotic, it becomes expensive and stressful.`,
      },
      {
        heading: 'Bookkeeping vs Accounting: What\'s the Difference?',
        content: `People often use these words interchangeably, but they mean different things. Think of bookkeeping as gathering the raw materials, and accounting as building something useful from them.

**Bookkeeping** is the day-to-day recording of transactions. It is data entry at its core \u2014 recording sales, logging expenses, updating bank balances, chasing unpaid invoices.

**Accounting** takes that data and interprets it. It produces reports like your Profit and Loss statement, your Balance Sheet, and your tax calculations. It involves analysing trends, forecasting cash flow, and advising on tax strategy.

A bookkeeper records that you spent \u00a3500 on marketing. An accountant might tell you that your marketing spend is 15% of revenue and suggest whether that ratio is healthy for your industry.

Many small business owners do their own bookkeeping and hire an accountant once a year to help with the tax return. That is a perfectly sensible approach. As your business grows, you might hire a bookkeeper too.`,
      },
      {
        heading: 'Basic Bookkeeping Tasks: What Does It Actually Involve?',
        content: `The day-to-day work of bookkeeping breaks down into a few core tasks. None of them are complicated once you know what to do.

**Recording income.** Every time money comes into your business, note the date, who paid you, what it was for, and how much. If you issued an invoice, record the invoice number too.

**Recording expenses.** Every time money leaves your business, note the date, who you paid, what you bought, how much, and keep the receipt. Split your expenses into categories \u2014 this makes your tax return much easier.

**Bank reconciliation.** This means checking your bookkeeping records against your actual bank statement to make sure they match. If your books say you have \u00a33,250 but your bank says \u00a33,180, something is missing. Maybe a payment has not cleared, or you forgot to record a transaction.

**Managing money owed to you (debtors).** If you send invoices and customers pay later, keep track of who owes what and chase late payments. Cash basis businesses do not need to worry about this.

**Managing money you owe (creditors).** If suppliers give you time to pay, keep track of upcoming bills so you do not miss payment deadlines.

Most of this can be done in a simple cash book spreadsheet \u2014 one column for money in, one for money out, and a running balance.`,
      },
      {
        heading: 'Cash Basis vs Accruals: Which Method Should You Use?',
        content: `This is one of the most important choices you will make. It determines when you record your income and expenses.

**Cash basis accounting** (now the default for most sole traders and landlords from April 2024) means you record income when the money actually arrives in your bank account, and expenses when the money actually leaves. You only pay tax on money you have actually received. This is simpler and works well for most small businesses.

**Accrual accounting** (also called traditional accounting) means you record income when you earn it and expenses when you incur them, regardless of when cash changes hands. If you invoice a client in March and they pay in April, under accruals you record the income in March. Under cash basis, you record it in April.

Accrual accounting gives a more accurate picture of your business\'s financial health because it includes money you are owed and bills you need to pay. But it is more work.

**Who uses which method?**

Limited companies must use accrual accounting. Sole traders, landlords, and most partnerships now default to cash basis but can opt out if they prefer accruals. If your turnover is over \u00a3150,000, you used to be required to use accruals \u2014 but that threshold was removed from April 2024, so cash basis is now available to more businesses than ever.

If you are unsure, start with cash basis. You can always switch later.`,
      },
      {
        heading: 'How to Do Your Bookkeeping: Three Options',
        content: `There are three main ways to handle your bookkeeping. Each has trade-offs between cost, time, and complexity.

**Option 1: Spreadsheet (free)**
A simple Excel or Google Sheets cash book is enough for many small businesses, especially sole traders with straightforward finances. Record income and expenses as they happen, categorise everything, and reconcile against your bank statement monthly. Our free templates are built for exactly this.

Best for: Sole traders, freelancers, small landlords, new businesses with few transactions.

**Option 2: Accounting software (\u00a310-\u00a340 per month)**
Cloud accounting software like Xero, QuickBooks, or Sage connects to your bank account, imports transactions automatically, generates invoices, and produces reports at the click of a button. It saves significant time once your business has more than a handful of transactions per month.

Best for: Growing businesses, VAT-registered businesses (especially under Making Tax Digital), businesses with employees, anyone who wants to spend less time on admin.

**Option 3: Hire a bookkeeper (\u00a315-\u00a325 per hour)**
A professional bookkeeper handles everything for you. They will set up your records, process transactions monthly, reconcile your bank, chase debtors, and hand neat figures to your accountant at year-end.

Best for: Business owners who hate admin, businesses with high transaction volumes, anyone whose time is better spent on revenue-generating work.`,
      },
      {
        heading: 'What Records Do You Need to Keep?',
        content: `HMRC does not specify exactly how you keep your records, but they do require you to keep evidence of all your business transactions. Here is what that means in practice:

**Income records:** Sales invoices, till rolls, paying-in slips, bank statements showing money received, contracts.

**Expense records:** Receipts, supplier invoices, bank statements showing payments made, mileage logs, rental agreements (for home office claims).

**Other records:** Bank statements, VAT records (if registered), payroll records (if you employ staff), details of business assets, and any grants or support scheme payments received.

HMRC requires you to keep these records for at least 5 years after the 31 January Self Assessment deadline for the relevant tax year. For the 2025/26 tax year (which ends 5 April 2026, with a filing deadline of 31 January 2027), you must keep records until at least 31 January 2032.

A phone photo of a receipt is perfectly acceptable as evidence. You do not need to keep physical paper copies. But you do need some form of proof for every transaction you claim on your tax return.`,
        callout: {
          type: 'warning',
          text: 'If HMRC opens an enquiry into your tax return and you cannot provide evidence for your figures, they can disallow expenses, charge penalties, and in serious cases pursue criminal prosecution for tax fraud. Good record-keeping is your protection.',
        },
      },
    ],
    faq: [
      {
        question: 'Do I need an accountant, or can I do my own books?',
        answer: 'Many sole traders and small business owners manage their own bookkeeping successfully, especially with the right templates. An accountant can help with more complex situations \u2014 limited companies, high turnover, unusual transactions \u2014 but for day-to-day records, you do not necessarily need one.',
      },
      {
        question: 'How long should I keep my records?',
        answer: 'HMRC requires you to keep business records for at least 5 years after the 31 January Self Assessment deadline for the relevant tax year. For extra safety, many business owners keep records for 6 years.',
      },
      {
        question: 'Can I use a spreadsheet instead of accounting software?',
        answer: 'Yes \u2014 spreadsheets are perfectly acceptable for many small businesses. The key requirements are that your records are accurate, complete, and backed up. However, once Making Tax Digital for Income Tax applies to you (from April 2026 for those with income over \u00a350,000), you will need MTD-compatible software for quarterly submissions.',
      },
      {
        question: 'What is the difference between cash basis and accrual accounting?',
        answer: 'Cash basis records income when money is received and expenses when money is paid. Accrual accounting records income when it is earned and expenses when they are incurred, regardless of when cash changes hands. Cash basis is simpler and is now the default for most sole traders and landlords.',
      },
    ],
  },

  // =====================================================
  //  GUIDE 2: Getting Started as a Sole Trader
  // =====================================================
  {
    id: 'sole-trader-guide',
    title: 'Getting Started as a Sole Trader: Your First Steps',
    description: 'Everything you need to know about registering, setting up your records, and staying on top of your taxes as a newly self-employed person.',
    category: 'business',
    readTime: '10 min read',
    lastUpdated: 'June 2026',
    slug: 'sole-trader-guide',
    relatedTemplates: ['self-employed', 'cash-book', 'mileage-log', 'home-office'],
    relatedGuides: ['what-is-bookkeeping', 'business-expenses', 'mtd-guide'],
    sections: [
      {
        heading: 'At a Glance',
        content: '',
        bullets: [
          'You must register with HMRC as self-employed within 3 months of starting to trade',
          'You will pay Income Tax and Class 2 & Class 4 National Insurance on your profits',
          'Keep records of all income and expenses from day one',
          'Your tax return deadline is 31 January each year',
          'Consider registering for VAT if your turnover exceeds \u00a385,000',
          'Cash basis accounting is now the default for sole traders',
        ],
      },
      {
        heading: 'Registering as Self-Employed',
        content: `If you start working for yourself, you must register with HMRC as a sole trader. You can do this online at GOV.UK. The deadline to register is 5 October in your business\'s second tax year.

Here is what that means in plain English: if you start trading in August 2025 (which falls in the 2025/26 tax year that runs from April 2025 to April 2026), you must register by 5 October 2026.

Once registered, HMRC will send you a Unique Taxpayer Reference (UTR) number by post. You need this UTR to file your Self Assessment tax return. It usually arrives within 10 working days (21 if you are abroad).

You will also need to set up a Government Gateway account if you do not already have one. This is how you access HMRC\'s online services, including your tax return.

Registration is free. You do not need to form a limited company \u2014 being a sole trader is the simplest business structure in the UK.`,
        callout: {
          type: 'warning',
          text: 'If you miss the registration deadline, HMRC can charge penalties. The penalty increases the longer you delay, so register as soon as you start trading.',
        },
      },
      {
        heading: 'Setting Up Your Bookkeeping',
        content: `The most common mistake new sole traders make is leaving their record-keeping until tax time. Do not do this. Set up a simple system from day one and spend 15 minutes each week updating it. You will thank yourself later.

Here is the simplest possible system:

**Step 1:** Open a separate bank account for your business. It does not need to be a business account \u2014 a personal current account works fine when you are starting out. The key is keeping business and personal money separate so you do not miss transactions or accidentally claim personal expenses.

**Step 2:** Choose how you will record transactions. A spreadsheet cash book is the easiest free option. Record every payment received and every expense paid, with dates, descriptions, and categories. Our Self-Employed Log template is designed for exactly this.

**Step 3:** Keep every receipt. Take a photo on your phone and save it to a folder named with the tax year (e.g., \'2025-26 receipts\'). HMRC accepts photos as evidence.

**Step 4:** Set a weekly reminder to update your records. Friday afternoon works well for many people. Spend 15 minutes logging the week\'s transactions and checking your bank balance matches your spreadsheet.

**Step 5:** Reconcile monthly. Compare your spreadsheet totals against your bank statement. If they do not match, find the missing transaction before you forget about it.`,
      },
      {
        heading: 'What Expenses Can You Claim?',
        content: `One of the biggest benefits of being self-employed is that you can deduct business expenses from your income before you pay tax. This means you only pay tax on your profit, not your total turnover.

You can claim any cost that is incurred \'wholly and exclusively\' for business purposes. Here are the most common categories:

**Office costs:** Stationery, printing, postage, phone and internet bills, computer software.

**Travel:** Business mileage (45p per mile for the first 10,000 miles, 25p thereafter), train fares, parking, tolls. You cannot claim commuting from home to a permanent workplace.

**Professional fees:** Accountant fees, solicitor fees for business matters, professional subscriptions.

**Marketing:** Website costs, advertising, business cards, networking events.

**Training:** Courses that improve your existing business skills. You generally cannot claim for training that prepares you for a new trade.

**Use of home:** If you work from home, you can claim a proportion of your household bills. HMRC offers simplified rates (\u00a310-\u00a326 per month depending on hours worked) or you can calculate the actual business percentage of your costs.

**Other allowable costs:** Bank charges, insurance, protective clothing, staff costs (salaries, NI, pension contributions), hiring equipment.

**You cannot claim:** Entertaining clients, fines and penalties, personal expenses, your own wages or drawings, clothing for everyday wear (even if you only wear it for work).`,
      },
      {
        heading: 'National Insurance for the Self-Employed',
        content: `As a sole trader, you pay two types of National Insurance through your Self Assessment tax return:

**Class 2 National Insurance** is a flat weekly rate (\u00a33.45 per week for 2025/26). You only pay this if your profits are above the Small Profits Threshold (\u00a36,725 for 2025/26). If you earn less than this, you can choose to pay Class 2 voluntarily to maintain your entitlement to the State Pension and certain benefits.

**Class 4 National Insurance** is a percentage of your profits. For 2025/26, you pay 6% on profits between \u00a312,570 and \u00a350,270, and 2% on profits above \u00a350,270. These thresholds and rates are frozen at 2023/24 levels as part of the government\'s tax policy.

Class 2 and Class 4 NICs are calculated automatically when you complete your Self Assessment tax return. You do not need to calculate them yourself.`,
      },
      {
        heading: 'Tax Rates and Deadlines',
        content: `Understanding what you owe and when helps you avoid nasty surprises. Here are the key numbers for the 2025/26 tax year:

**Income Tax:**
You pay Income Tax on your profits (income minus allowable expenses). The rates are:`,
        table: {
          headers: ['Band', 'Taxable Income', 'Rate'],
          rows: [
            ['Personal Allowance', 'Up to \u00a312,570', '0%'],
            ['Basic Rate', '\u00a312,571 to \u00a350,270', '20%'],
            ['Higher Rate', '\u00a350,271 to \u00a3125,140', '40%'],
            ['Additional Rate', 'Over \u00a3125,140', '45%'],
          ],
        },
      },
      {
        heading: '',
        content: `**Key Deadlines:**`,
        table: {
          headers: ['Date', 'What is Due'],
          rows: [
            ['5 October 2026', 'Register for Self Assessment (if you started trading in 2025/26)'],
            ['31 January 2027', 'Submit online Self Assessment and pay any tax owed for 2025/26'],
            ['31 July 2027', 'Second payment on account towards your 2026/27 tax bill'],
          ],
        },
      },
      {
        heading: 'Payments on Account',
        content: `If your tax bill (including Class 4 NIC) is more than \u00a31,000, HMRC will ask you to make \'payments on account\' towards next year\'s tax bill. These are advance payments based on your current year\'s tax.

You pay 50% of your estimated next-year tax bill by 31 January, and another 50% by 31 July. When you file your actual return, you either pay the difference (a \'balancing payment\') or receive a refund if you overpaid.

This catches many new sole traders by surprise. Your first tax bill can feel almost double what you expected because you are paying for the current year and making an advance payment for next year.

**Example:** Your 2025/26 tax bill is \u00a33,000. You pay:
- \u00a33,000 by 31 January 2027 (the actual tax owed)
- Plus \u00a31,500 as a payment on account for 2026/27
- Total due 31 January 2027: \u00a34,500
- Then another \u00a31,500 by 31 July 2027

If your 2026/27 tax bill turns out to be \u00a33,200, you have already paid \u00a33,000 on account, so you only owe a \u00a3200 balancing payment in January 2028.

If your income drops, you can request to reduce your payments on account. But be careful \u2014 if you reduce them too much and underpay, HMRC will charge interest.`,
      },
    ],
    faq: [
      {
        question: 'How much can I earn before registering as self-employed?',
        answer: 'The \u2018trading allowance\' means you can earn up to \u00a31,000 from self-employment in a tax year without needing to register or pay tax. Above that, you must register with HMRC.',
      },
      {
        question: 'Can I be employed and self-employed at the same time?',
        answer: 'Yes, many people have a full-time job and run a side business. You still need to register as self-employed and file a Self Assessment for your business income. Your employed income is taxed through PAYE as normal, and your self-employed income is taxed through Self Assessment.',
      },
      {
        question: 'Do I need a business bank account?',
        answer: 'You are not legally required to have a separate business account as a sole trader, but it is strongly recommended. It keeps your records clean, makes tax time easier, and looks more professional. Most high street banks offer free business banking for the first 12-18 months.',
      },
    ],
  },

  // =====================================================
  //  GUIDE 3: Landlord Tax Guide
  // =====================================================
  {
    id: 'landlord-tax-guide',
    title: 'Landlord Tax Guide: A Plain-English Guide for UK Property Owners',
    description: 'Understanding rental income tax, allowable expenses, Section 24 mortgage relief, and how to keep HMRC happy as a landlord.',
    category: 'tax',
    readTime: '12 min read',
    lastUpdated: 'June 2026',
    slug: 'landlord-tax-guide',
    relatedTemplates: ['rental-property', 'mtd-quarterly-property'],
    relatedGuides: ['sole-trader-guide', 'cash-vs-accrual', 'mtd-guide'],
    sections: [
      {
        heading: 'At a Glance',
        content: '',
        bullets: [
          'Income tax is charged on rental profit \u2014 rent received minus allowable expenses',
          'Report rental properties on a Self Assessment tax return each year using the SA105 pages',
          'Register by 5 October after your first tax year of receiving rental income',
          'Mortgage interest: you get a 20% income tax credit (not a direct expense deduction)',
          'Keep financial records for at least 5 years after the 31 January filing deadline',
          'Making Tax Digital applies to landlords with gross property income over \u00a350,000 from April 2026',
        ],
      },
      {
        heading: 'What Counts as Rental Income?',
        content: `Your taxable rental income includes more than just the monthly rent payments. HMRC counts almost everything a tenant pays you as rental income, including:

- Monthly rent payments
- Payments for repairs or maintenance that the tenant makes (even if you did not ask them to)
- Non-refundable deposits (refundable tenancy deposits held in a protection scheme do not count)
- Payments for the use of furniture or other items included in the letting
- Cleaning or gardening services paid by the tenant if these are part of the rental arrangement
- Any premiums paid for the grant of a lease

If you receive rental income, you must declare it to HMRC. There is no minimum threshold \u2014 even \u00a31 of rental income is technically reportable. However, the \u00a31,000 property allowance means you can earn up to \u00a31,000 of property income per year tax-free without needing to report it.

If your property income is between \u00a31,000 and \u00a32,500, you can either use the property allowance or report the actual income and claim actual expenses. Above \u00a32,500, you must register for Self Assessment and report everything.`,
      },
      {
        heading: 'Allowable Expenses',
        content: `You can deduct \'allowable expenses\' from your rental income before paying tax. These are costs that are wholly and exclusively for the purpose of letting the property. Common allowable expenses include:

**Property maintenance and repairs:** Fixing a broken boiler, repairing a leaking roof, repainting between tenancies, replacing broken windows. Note: improvements (like adding an extension) are not repairs \u2014 these are capital costs and are treated differently.

**Replacement of domestic items:** If you provide furnished accommodation, you can claim for replacing furnishings, appliances, and kitchenware on a like-for-like basis. This replaced the old \'Wear and Tear\' allowance. You cannot claim for the original purchase, only replacements.

**Professional fees:** Letting agent fees, accountant fees, legal fees for tenancy agreements (but not for buying the property).

**Insurance:** Buildings insurance, contents insurance, rent guarantee insurance, public liability insurance.

**Utilities and council tax:** If you pay these (rather than the tenant), you can claim them. If the tenant pays them directly, they are not your expense.

**Ground rent and service charges:** For leasehold properties.

**Cleaning and gardening:** If you pay for these services between tenancies or during the tenancy.

**Advertising:** Costs to find tenants.

**Telephone and stationery:** For managing your properties.`,
      },
      {
        heading: 'Section 24: Mortgage Interest Tax Relief',
        content: `This is the change that has caused the most confusion for landlords. Since April 2020, you can no longer deduct mortgage interest from your rental income as an expense. Instead, you receive a tax credit equal to 20% of your mortgage interest.

**How it works in practice:**

You receive \u00a320,000 in rental income and pay \u00a38,000 in mortgage interest. Your other allowable expenses are \u00a33,000.

Under the old rules, your taxable profit would have been \u00a320,000 - \u00a38,000 - \u00a33,000 = \u00a39,000.

Under the new rules, your taxable profit is \u00a320,000 - \u00a33,000 = \u00a317,000. You then pay tax on \u00a317,000 and receive a 20% tax credit on the \u00a38,000 mortgage interest (which is \u00a31,600).

If you are a basic-rate taxpayer (20%), this makes no difference to your final tax bill. But if you are a higher-rate taxpayer (40%), the effect is significant. You are paying 40% tax on income that was previously sheltered by the mortgage interest deduction, and only getting 20% back.

**Example for a higher-rate taxpayer:**
Tax on \u00a317,000 at 40% = \u00a36,800. Minus 20% credit on \u00a38,000 = \u00a31,600. Net tax = \u00a35,200.

Under the old system: Tax on \u00a39,000 at 40% = \u00a33,600.

The Section 24 change costs this landlord an extra \u00a31,600 in tax.

This is why many landlords have restructured into limited companies, where mortgage interest remains fully deductible as a business expense. But company ownership has its own complications and costs.`,
      },
      {
        heading: 'Keeping Records as a Landlord',
        content: `Accurate records are the foundation of landlord accounting and your evidence if HMRC ever queries your return. Good records also mean you capture every allowable expense.

For every rent payment received, record:
- Date received
- Amount
- Tenant name
- Property address
- Rental period covered
- Method of payment

For every expense, record:
- Date paid
- Amount
- Supplier name
- Description of the work or item
- Which property it relates to
- Receipt or invoice (a phone photo is fine)

You should also keep:
- Bank statements from a dedicated rental account (strongly recommended)
- Tenancy agreements
- Letting agent statements
- Annual mortgage statements showing interest paid (needed for the Section 24 calculation)
- Insurance documents and safety certificates

Keep all financial records for at least five years after the 31 January filing deadline. For the 2025/26 tax year (return due 31 January 2027), keep records until at least January 2032.

HMRC can open an enquiry at any point within that window. Many landlords keep six years of records to be safe.`,
      },
      {
        heading: 'Multiple Rental Properties',
        content: `HMRC treats all your UK rental properties as a single \'property business\'. This means you combine the income and expenses from all your properties into one set of figures on your tax return.

**Practical implications:**

- You file one set of SA105 Property pages covering all your UK properties
- Profits and losses across properties are netted together automatically
- You cannot choose to report some properties and not others
- If one property makes a loss and another makes a profit, the loss offsets the profit in the same year

**Despite this combined treatment, keep separate records per property.** This helps you:

- See which properties are profitable and which are not
- Prepare for Capital Gains Tax if you sell a property
- Respond to HMRC if they query a specific property
- Manage your portfolio effectively

Our Rental Property Tracker template is designed to track up to 5 properties separately while also producing the combined figures you need for your tax return.

**Overseas properties are kept entirely separate.** Their income and expenses cannot be combined with UK properties. They are reported on the SA106 (Foreign Income) pages instead.`,
      },
      {
        heading: 'Filing Your Tax Return',
        content: `Rental income is reported on the SA105 (Property) supplementary pages of your Self Assessment return. If this is your first year of receiving rental income, register for Self Assessment by 5 October after the end of that tax year.

The SA105 asks for:
- Total rental income from all properties
- Allowable expenses by category
- Mortgage interest paid (used for the Section 24 tax credit calculation)
- Any losses brought forward from previous years
- Property income allowance (if applicable)

HMRC\'s online system calculates your tax liability automatically as you enter figures.

**Important deadlines:**`,
        table: {
          headers: ['Deadline', 'What It Is'],
          rows: [
            ['5 October', 'Register for Self Assessment if receiving rental income for the first time'],
            ['31 October', 'Paper Self Assessment return deadline'],
            ['31 January', 'Online SA return deadline AND tax payment deadline'],
            ['31 July', 'Second payment on account (if applicable)'],
          ],
        },
      },
    ],
    faq: [
      {
        question: 'Can I offset a loss on one property against profit on another?',
        answer: 'Yes. HMRC treats all your UK rental properties as a single business. Losses on one property automatically reduce profits on others. If your total rental business makes a loss, you can carry it forward to future years.',
      },
      {
        question: 'What is the Rent a Room scheme?',
        answer: 'If you let a furnished room in your own home, the Rent a Room scheme lets you earn up to \u00a37,500 per year tax-free (\u00a33,750 if you share the income). You do not need to declare anything if you stay under this threshold. If you earn more, you can either pay tax on the excess above \u00a37,500 or opt out of the scheme and claim actual expenses instead.',
      },
      {
        question: 'Should I put my properties in a limited company?',
        answer: 'This is a complex decision that depends on your personal circumstances. Inside a company, mortgage interest is fully deductible and corporation tax rates (25% for profits over \u00a350,000) may be lower than your personal income tax rate. However, you face double taxation (corporation tax + dividend tax), higher mortgage rates for company properties, and additional administrative costs. Speak to an accountant before making this decision.',
      },
    ],
  },

  // =====================================================
  //  GUIDE 4: VAT Explained
  // =====================================================
  {
    id: 'vat-explained',
    title: 'VAT Explained: A Practical Guide for UK Small Businesses',
    description: 'Everything you need to know about VAT registration, rates, schemes, and compliance \u2014 explained without the jargon.',
    category: 'tax',
    readTime: '10 min read',
    lastUpdated: 'June 2026',
    slug: 'vat-explained',
    relatedTemplates: ['vat-return'],
    relatedGuides: ['mtd-guide', 'sole-trader-guide'],
    sections: [
      {
        heading: 'At a Glance',
        content: '',
        bullets: [
          'You must register for VAT if your taxable turnover exceeds \u00a385,000 in a 12-month period',
          'The standard VAT rate is 20%. Reduced rate is 5%. Some goods and services are zero-rated (0%) or exempt',
          'You charge VAT on your sales (output VAT) and reclaim VAT on your purchases (input VAT)',
          'VAT returns are usually filed quarterly through Making Tax Digital (MTD)',
          'The Flat Rate Scheme simplifies VAT for small businesses',
          'Penalties for late filing or payment can be significant',
        ],
      },
      {
        heading: 'What Is VAT?',
        content: `VAT (Value Added Tax) is a tax on the value added to goods and services at each stage of production and distribution. In practice, it works like this:

As a VAT-registered business, you charge VAT on the goods and services you sell to your customers. This is called \'output VAT\'. You also pay VAT on the goods and services you buy from your suppliers. This is called \'input VAT\'.

Every quarter (or month, or year \u2014 your choice), you file a VAT return with HMRC. You tell them how much output VAT you collected and how much input VAT you paid. If your output VAT is higher than your input VAT, you pay the difference to HMRC. If your input VAT is higher, HMRC refunds the difference to you.

You are essentially acting as a tax collector. The VAT your customers pay you gets passed on to HMRC, minus any VAT you have already paid to your suppliers.

**Important:** VAT is not your money. It belongs to HMRC from the moment your customer pays it. Many small business owners get caught out by treating VAT-inclusive amounts as their own revenue. Keep VAT separate in your mind (and ideally in a separate bank account).`,
      },
      {
        heading: 'When Do You Need to Register?',
        content: `You must register for VAT if:

**Your taxable turnover exceeds \u00a385,000** in any rolling 12-month period. This is not calendar year \u2014 it is any consecutive 12 months. If your turnover from 1 July 2024 to 30 June 2025 was \u00a386,000, you must register. You have 30 days from the end of the month in which you exceeded the threshold.

**You expect your turnover to exceed \u00a385,000** in the next 30 days alone. This applies to one-off large orders or contracts.

You can also **voluntarily register** for VAT even if you are below the threshold. This can make sense if:
- Your customers are VAT-registered businesses (they can reclaim the VAT you charge, so it costs them nothing)
- You pay significant VAT on your purchases and want to reclaim it
- Being VAT-registered makes your business look more established

You should **not** voluntarily register if your customers are consumers (who cannot reclaim VAT) and you operate in a price-sensitive market. Adding 20% VAT to your prices might lose you business.`,
      },
      {
        heading: 'VAT Rates',
        content: `The UK has several VAT rates depending on what you are selling:`,
        table: {
          headers: ['Rate', 'Applies To'],
          rows: [
            ['Standard (20%)', 'Most goods and services: consulting, retail, construction, professional services, software'],
            ['Reduced (5%)', 'Domestic fuel and power, energy-saving materials, children\'s car seats, sanitary products'],
            ['Zero (0%)', 'Most food, children\'s clothing, books and newspapers, public transport, new-build homes'],
            ['Exempt', 'Insurance, financial services, education, healthcare, postage stamps, rent on residential property'],
          ],
        },
      },
      {
        heading: 'VAT Schemes',
        content: `HMRC offers several VAT schemes designed to simplify things for smaller businesses:

**Flat Rate Scheme:** Instead of calculating VAT on every transaction, you pay a fixed percentage of your total (VAT-inclusive) turnover. The percentage varies by industry (12.5% for IT consultants, 14.5% for accountancy, 6.5% for retail food, etc.). You cannot reclaim input VAT on purchases (except capital assets over \u00a32,000). This scheme is available if your taxable turnover is \u00a3150,000 or less.

**Cash Accounting Scheme:** You only pay VAT to HMRC when your customers pay you, and you only reclaim VAT when you pay your suppliers. This is different from the standard scheme where VAT is due based on invoice dates regardless of payment timing. Good for businesses with slow-paying customers. Available if turnover is \u00a31.35 million or less.

**Annual Accounting Scheme:** You make advance VAT payments throughout the year based on your last return (or estimated if new), then file one annual VAT return and settle the difference. Reduces admin but gives less frequent cash flow information. Available if turnover is \u00a31.35 million or less.`,
      },
      {
        heading: 'Filing Your VAT Return',
        content: `Since April 2022, all VAT-registered businesses must file their VAT returns through Making Tax Digital (MTD). This means:

- You cannot file VAT returns through the old HMRC portal
- You must use MTD-compatible software (Xero, QuickBooks, Sage, FreeAgent, or bridging software)
- Your software must keep digital records and submit the return directly to HMRC

Most businesses file quarterly. Your quarters are determined by your VAT registration \u2014 they might be April-June, July-September, October-December, and January-March, or they might be offset by a month depending on when you registered.

Your VAT return asks for 9 \'boxes\':
- Box 1: VAT due on sales and outputs
- Box 2: VAT due on acquisitions from EU (usually zero now)
- Box 3: Total VAT due (Box 1 + Box 2)
- Box 4: VAT reclaimed on purchases and inputs
- Box 5: Net VAT to pay or reclaim (Box 3 minus Box 4)
- Box 6: Total value of sales excluding VAT
- Box 7: Total value of purchases excluding VAT
- Box 8: Total value of EU sales excluding VAT
- Box 9: Total value of EU purchases excluding VAT

The deadline to submit and pay is usually one calendar month and 7 days after the end of your VAT period. For the quarter ending 30 June, the deadline is 7 August.`,
        callout: {
          type: 'warning',
          text: 'Penalties for late VAT filing work on a points-based system. You receive a point for each late submission. At a threshold (2 points for annual, 4 for quarterly, 5 for monthly), you receive a \u00a3200 penalty. Points expire after compliance periods (good behaviour) but the threshold penalty applies each time you reach it.',
        },
      },
    ],
    faq: [
      {
        question: 'Can I deregister from VAT?',
        answer: 'Yes, you can cancel your VAT registration if your taxable turnover falls below \u00a383,000 (the deregistration threshold). You can also deregister if you stop trading or sell your business. You must tell HMRC within 30 days.',
      },
      {
        question: 'Do I charge VAT on sales to EU customers?',
        answer: 'Since Brexit, sales to EU customers are treated as exports (zero-rated for VAT) if the customer is a business. You need evidence the goods left the UK. Sales to EU consumers have different rules depending on the value and the EU country \u2014 you may need to register for VAT in that country or use the One Stop Shop (OSS) scheme.',
      },
      {
        question: 'What happens if I make a mistake on my VAT return?',
        answer: 'If the net error is \u00a310,000 or less (or \u00a31% of turnover up to \u00a350,000), you can correct it on your next VAT return. For larger errors, you must notify HMRC separately. Deliberate errors carry much higher penalties than genuine mistakes.',
      },
    ],
  },

  // =====================================================
  //  GUIDE 5: Making Tax Digital
  // =====================================================
  {
    id: 'mtd-guide',
    title: 'Making Tax Digital: What UK Business Owners Need to Know',
    description: 'HMRC\'s Making Tax Digital programme explained. Who it affects, what you need to do, and when the deadlines are.',
    category: 'mtd',
    readTime: '8 min read',
    lastUpdated: 'June 2026',
    slug: 'making-tax-digital',
    relatedTemplates: ['mtd-quarterly-property'],
    relatedGuides: ['vat-explained', 'sole-trader-guide', 'landlord-tax-guide'],
    sections: [
      {
        heading: 'At a Glance',
        content: '',
        bullets: [
          'Making Tax Digital (MTD) is HMRC\'s programme to move tax online',
          'MTD for VAT is already mandatory for all VAT-registered businesses',
          'MTD for Income Tax (ITSA) starts April 2026 for those with qualifying income over \u00a350,000',
          'You must keep digital records and submit quarterly updates using compatible software',
          'You also file an End of Period Statement and Final Declaration to confirm your figures',
          'Penalties are based on a points system for late submissions',
        ],
      },
      {
        heading: 'What Is Making Tax Digital?',
        content: `Making Tax Digital (MTD) is HMRC\'s long-term plan to digitise the UK tax system. The goal is to reduce errors, make tax more efficient, and give taxpayers a clearer picture of their tax position throughout the year.

In practical terms, MTD means:
- You keep your business records digitally (in software, not on paper)
- Your software submits information to HMRC directly through an API
- You send updates more frequently than once a year

MTD is being introduced in stages. VAT was first. Income Tax Self Assessment (ITSA) is next. Corporation Tax will follow later.

MTD is not optional once it applies to you. If your business falls within the scope, you must comply or face penalties.`,
      },
      {
        heading: 'The Timeline: What Happens When',
        content: `MTD is being rolled out in phases. Here is what applies and when:`,
        table: {
          headers: ['Date', 'What Changes'],
          rows: [
            ['April 2022', 'MTD for VAT became mandatory for all VAT-registered businesses'],
            ['April 2026', 'MTD for Income Tax: sole traders and landlords with qualifying income over \u00a350,000'],
            ['April 2027', 'MTD for Income Tax extended to those with qualifying income over \u00a330,000'],
            ['April 2028', 'MTD for Income Tax extended to those with qualifying income over \u00a320,000 (subject to review)'],
            ['TBC', 'MTD for Corporation Tax \u2014 date not yet confirmed, expected 2026 at earliest'],
          ],
        },
      },
      {
        heading: 'What Counts as \u201cQualifying Income\u201d?',
        content: `For MTD for Income Tax, \'qualifying income\' means the total of your self-employment income and property income. Employment income (PAYE) does not count towards the threshold.

**Example 1:** You earn \u00a340,000 from self-employment and \u00a315,000 from rental property. Your total qualifying income is \u00a355,000. You are above the \u00a350,000 threshold and must join MTD from April 2026.

**Example 2:** You earn \u00a360,000 from your job (PAYE) and \u00a320,000 from a side business. Your qualifying income is \u00a320,000. You are below the threshold and do not need to join MTD in April 2026 (but might in 2027 or 2028 as thresholds drop).

**Example 3:** You earn \u00a330,000 from self-employment and have no property income. You are below the April 2026 threshold but above the April 2027 threshold, so you will need to join from April 2027.

Income is measured gross (before expenses), not net profit.`,
      },
      {
        heading: 'What You Need to Do Under MTD',
        content: `Once MTD applies to you, there are four key obligations:

**1. Keep digital records.** Your business income and expenses must be recorded in digital form. A shoebox of receipts no longer counts. You can use accounting software, a spreadsheet linked to MTD bridging software, or a compatible app.

**2. Submit quarterly updates.** Four times a year, you send HMRC a summary of your income and expenses. These are not full tax calculations \u2014 they are simply the totals for the quarter. Think of them as progress reports.

Quarterly updates are due one month after the quarter ends. If your quarters align with the tax year (April-March), your deadlines would be 5 August, 5 November, 5 February, and 5 May.

**3. Submit an End of Period Statement (EOPS).** After the tax year ends, you confirm that your quarterly figures are complete and correct, and add any adjustments (capital allowances, overlap relief, etc.). This is due by 31 January after the tax year ends.

**4. Submit a Final Declaration.** This replaces the traditional Self Assessment tax return. You confirm all your income sources (not just self-employment and property), claim allowances, and settle your tax bill. Due by 31 January.`,
      },
      {
        heading: 'What Software Do You Need?',
        content: `To comply with MTD, your software must be able to keep digital records and submit data directly to HMRC through their API. There are three main approaches:

**Full accounting software (recommended):** Xero, QuickBooks, Sage, and FreeAgent are all MTD-compatible. They handle everything from bank feeds to VAT to quarterly submissions. Prices range from \u00a310 to \u00a340 per month.

**Spreadsheet + bridging software:** If you prefer to keep records in Excel, you can use \'bridging software\' like Absolute, VitalTax, or Taxd. You prepare your spreadsheet as normal, then the bridging software reads it and submits to HMRC. This is a lower-cost option (some bridging software is free or under \u00a310 per month).

**HMRC\'s free software:** HMRC has committed to providing free MTD software for those with the simplest tax affairs (straightforward income and expenses, no VAT, no employees). Details are still emerging for the ITSA rollout.

If you already use accounting software, check with your provider that they are MTD-ready for Income Tax. Most major providers are.`,
        callout: {
          type: 'tip',
          text: 'Do not wait until April 2026 to sort out your software. Give yourself time to choose the right solution, migrate your data, and learn how to use it. Many providers offer free trials \u2014 start exploring your options now.',
        },
      },
      {
        heading: 'Penalties Under MTD',
        content: `MTD introduces a new points-based penalty system for late submissions:

- You receive 1 point for each late quarterly update, EOPS, or Final Declaration
- Once you hit the threshold (4 points for quarterly filers), you receive a \u00a3200 penalty
- You continue to receive \u00a3200 penalties each time you submit late while at the threshold
- Points expire after a period of compliance (all deadlines met for 12 months for quarterly filers)

Separate penalties apply for late payment of tax, which work on an interest and surcharge basis similar to the current system.

The key difference from the old system is that penalties are for late submissions, not just late tax payments. Even if you owe no tax, submitting your quarterly update late can earn you a point.`,
      },
    ],
    faq: [
      {
        question: 'Can I still use a spreadsheet under MTD?',
        answer: 'Yes, but you will need bridging software to submit your figures to HMRC. The spreadsheet itself is fine for record-keeping, but the submission must be done through MTD-compatible software. Our MTD Quarterly Property template is designed to produce the exact figures you need for your quarterly updates.',
      },
      {
        question: 'What if my income is below the threshold?',
        answer: 'If your qualifying income is below the MTD threshold, you continue to file your Self Assessment tax return as normal (through the HMRC portal or SA100 form). The old system remains in place for those outside MTD. However, the thresholds are scheduled to drop over time, so you may need to join eventually.',
      },
      {
        question: 'Do I need separate software for MTD VAT and MTD Income Tax?',
        answer: 'Not necessarily. Most major accounting software handles both. If you use Xero, QuickBooks, or Sage for VAT, the same subscription will likely cover Income Tax submissions when they become mandatory. Check with your provider.',
      },
    ],
  },

  // =====================================================
  //  GUIDE 6: Self Assessment Guide
  // =====================================================
  {
    id: 'self-assessment-guide',
    title: 'Self Assessment Guide: How to Complete Your Tax Return',
    description: 'A step-by-step guide to completing your Self Assessment tax return, from registering to submitting on time.',
    category: 'tax',
    readTime: '8 min read',
    lastUpdated: 'June 2026',
    slug: 'self-assessment-guide',
    relatedTemplates: ['self-employed', 'cash-book', 'rental-property'],
    relatedGuides: ['sole-trader-guide', 'landlord-tax-guide', 'business-expenses'],
    sections: [
      {
        heading: 'At a Glance',
        content: '',
        bullets: [
          'Self Assessment is how HMRC collects Income Tax from people who are not taxed through PAYE',
          'The deadline to register is 5 October after the end of your first tax year',
          'The deadline to file online is 31 January after the tax year ends',
          'The deadline to pay any tax owed is also 31 January',
          'Payments on account may mean you pay roughly 50% more in your first year',
          'Penalties for late filing start at \u00a3100 and increase over time',
        ],
      },
      {
        heading: 'Who Needs to File a Self Assessment?',
        content: `You must file a Self Assessment tax return if any of the following apply:

- You are self-employed (sole trader) with turnover above the \u00a31,000 trading allowance
- You are a partner in a business partnership
- You are a landlord receiving rental income above the \u00a31,000 property allowance
- You have income from savings, investments, or dividends above certain thresholds
- You have foreign income
- You need to claim certain tax reliefs (e.g., reliefs on charitable donations)
- You are a higher earner (over \u00a3100,000) whose tax affairs are not fully covered by PAYE
- You received income from selling assets that might be liable for Capital Gains Tax

If you are employed and your only income is your salary (taxed through PAYE), and you have no other income sources, you probably do not need to file a Self Assessment.

If you are unsure, HMRC has a handy tool on their website that tells you whether you need to file.`,
      },
      {
        heading: 'Registering for Self Assessment',
        content: `If this is your first time filing, you need to register with HMRC. You can do this online at GOV.UK.

**The deadline to register is 5 October** after the end of the tax year in which you started receiving untaxed income.

For example, if you started freelancing in June 2025 (during the 2025/26 tax year), you must register by 5 October 2026.

**What you will need:**
- Your National Insurance number
- Your address and contact details
- The date you started receiving self-employed income
- Details of your business (name, address, type of work)

After registering, HMRC will send you a Unique Taxpayer Reference (UTR) by post. This usually takes about 10 working days (21 days if you are abroad). You cannot file your return without your UTR, so register early.

You will also need a Government Gateway user ID and password to access HMRC\'s online services.`,
        callout: {
          type: 'warning',
          text: 'If you miss the 5 October registration deadline, HMRC can charge a penalty. The penalty increases the longer you delay. Register as soon as you know you need to \u2014 do not leave it until January.',
        },
      },
      {
        heading: 'What You Need Before You Start',
        content: `Gather these documents before you sit down to complete your return. It will make the process much faster:

**For self-employment income:**
- Your bookkeeping records or cash book spreadsheet for the tax year (6 April to 5 April)
- Bank statements for your business account
- Invoices you issued and payments you received
- Receipts for all business expenses

**For employment income (if applicable):**
- Your P60 form (shows total salary and tax paid)
- Your P11D form (if you received benefits in kind)
- Any P45 forms from jobs you left during the year

**For property income:**
- Records of rent received and expenses paid
- Mortgage interest statements
- Letting agent statements

**For other income:**
- Interest certificates from banks and building societies
- Dividend vouchers
- Pension statements
- Capital gains calculations (if you sold assets)

**General:**
- Your UTR number
- Your National Insurance number
- Details of any charitable donations (for Gift Aid claims)
- Student loan statements (if applicable)

Most people find that having their records well organised means the actual form-filling takes about an hour.`,
      },
      {
        heading: 'How to Complete the Return',
        content: `The Self Assessment form (SA100) has several sections. Most people only need to complete the main form plus one or two supplementary pages.

**SA100 (Main Tax Return):** This covers your personal details, income from employment, pensions, savings, and investments. It also has sections for Gift Aid donations and Student Loan repayments.

**SA103 (Self-Employment):** If you are self-employed, you complete the self-employment pages. The short version (SA103S) is for businesses with turnover under \u00a385,000. The full version (SA103F) is for those above. You enter your total turnover, expenses by category, and capital allowances.

**SA105 (Property):** If you receive rental income, you complete the property pages. You enter total rental income, allowable expenses, mortgage interest (for the tax credit calculation), and any losses brought forward.

**Other supplementary pages:** SA106 for foreign income, SA108 for capital gains, SA109 for residence and remittance basis, etc. Most people do not need these.

**The online system calculates your tax automatically** as you enter figures. You can see your estimated tax bill before you submit. This is useful \u2014 if the number looks wildly wrong, you can go back and check your entries before finalising.

You can save your progress and come back later. Do not feel you need to complete it in one sitting.`,
      },
      {
        heading: 'Important Deadlines',
        content: ``,
        table: {
          headers: ['Deadline', 'What is Due'],
          rows: [
            ['5 October', 'Register for Self Assessment (after your first tax year)'],
            ['31 October', 'Paper tax return deadline'],
            ['31 January', 'Online tax return deadline'],
            ['31 January', 'Balancing payment (any tax owed for the previous tax year)'],
            ['31 January', 'First payment on account (advance payment for next year)'],
            ['31 July', 'Second payment on account'],
          ],
        },
      },
      {
        heading: 'Penalties for Late Filing',
        content: `Missing the 31 January deadline triggers an automatic penalty system:

- **1 day late:** \u00a3100 fixed penalty (even if you owe no tax)
- **3 months late:** \u00a310 per day (up to \u00a3900 maximum)
- **6 months late:** Additional \u00a3300 or 5% of the tax due (whichever is higher)
- **12 months late:** Another \u00a3300 or 5% of the tax due (whichever is higher). In serious cases, HMRC can charge up to 100% of the tax owed

These penalties apply to the filing, not the payment. There are separate penalties and interest for late payment of tax.

**If you have a reasonable excuse** for missing the deadline (serious illness, bereavement, system failure at HMRC), you can appeal the penalty. But \'I forgot\' or \'my accountant missed it\' are not considered reasonable excuses.`,
      },
    ],
    faq: [
      {
        question: 'How long does it take to complete a Self Assessment?',
        answer: 'If your records are well organised, the actual form-filling takes about 1-2 hours for a straightforward sole trader. More complex situations (multiple income sources, capital gains, foreign income) can take longer. The key is having all your documents ready before you start.',
      },
      {
        question: 'Can I amend my tax return after submitting it?',
        answer: 'Yes. You can amend your online tax return within 12 months of the original deadline (so by 31 January 2028 for the 2025/26 return filed in January 2027). After that, you would need to write to HMRC to explain the error.',
      },
      {
        question: 'What if I cannot pay my tax bill?',
        answer: 'Do not ignore it. Contact HMRC as soon as possible \u2014 they are usually willing to set up a Time to Pay arrangement, which lets you spread the cost over manageable monthly instalments. You may be charged interest, but this is better than accumulating penalties for non-payment.',
      },
    ],
  },

  // =====================================================
  //  GUIDE 7: Business Expenses
  // =====================================================
  {
    id: 'business-expenses',
    title: 'Business Expenses: What You Can and Cannot Claim',
    description: 'A practical guide to allowable business expenses, simplified claims, and keeping proper records \u2014 written in plain English.',
    category: 'expenses',
    readTime: '10 min read',
    lastUpdated: 'June 2026',
    slug: 'business-expenses',
    relatedTemplates: ['expense-tracker', 'mileage-log', 'home-office'],
    relatedGuides: ['sole-trader-guide', 'self-assessment-guide'],
    sections: [
      {
        heading: 'At a Glance',
        content: '',
        bullets: [
          'You can claim any cost incurred \u2018wholly and exclusively\' for business purposes',
          'Common claims include office costs, travel, professional fees, marketing, and training',
          'You cannot claim entertaining clients, fines, personal expenses, or your own wages',
          'Simplified expenses let you claim flat rates for mileage and working from home',
          'Always keep receipts as evidence \u2014 a phone photo is perfectly acceptable',
          'Good expense tracking reduces your tax bill and protects you in an HMRC enquiry',
        ],
      },
      {
        heading: 'The Golden Rule: Wholly and Exclusively',
        content: `The test HMRC applies is simple: was the cost incurred \'wholly and exclusively\' for the purpose of your business? If the answer is yes, it is probably an allowable expense. If the cost had a personal benefit as well as a business one, you can usually only claim the business portion.

**Example:** You buy a laptop for \u00a3800. You use it 80% for business and 20% for personal use. You can claim \u00a3640 (80%) as a business expense.

**Example:** You take a client out for lunch. The entire cost of the meal is \u2018business entertaining\' and is not allowable, even though it was for business purposes. This is a specific exception to the wholly-and-exclusively rule.

**Example:** You drive to a client meeting 20 miles away. The mileage is wholly for business. You can claim 45p per mile (for the first 10,000 miles).

The wholly-and-exclusively test applies to sole traders and partnerships. Limited companies have slightly different rules (they use the \'wholly, exclusively and necessarily\' test for employee expenses).`,
      },
      {
        heading: 'Common Allowable Expenses',
        content: `Here are the most common categories of allowable expenses for UK small businesses. Not every category will apply to you \u2014 just claim the ones relevant to your business.

**Office costs:** Stationery, postage, printing, phone bills, internet, computer software subscriptions. If you rent office space, the rent, rates, and utility bills are all allowable.

**Travel:** Business mileage (45p/mile for first 10,000 miles, 25p/mile after), train fares, bus fares, taxi fares for business journeys, parking, tolls, congestion charges, accommodation on business trips. You cannot claim commuting from home to a permanent workplace.

**Vehicle costs:** If you claim actual vehicle expenses rather than mileage, you can claim fuel, insurance, servicing, repairs, MOT, and road tax. You claim the business percentage of these costs. You can also claim capital allowances on the vehicle purchase price.

**Professional fees:** Accountant fees, solicitor fees for business matters, professional subscriptions to bodies relevant to your trade, costs of obtaining professional indemnity insurance.

**Marketing and advertising:** Website costs, social media advertising, Google Ads, business cards, flyers, networking event fees, PR costs.

**Training:** Courses that improve your existing business skills. For example, a web designer attending a coding course. You generally cannot claim for training that qualifies you for a new trade.

**Staff costs:** Salaries, wages, bonuses, employer\'s National Insurance, pension contributions, agency fees, subcontractors.

**Financial costs:** Bank charges, credit card fees, interest on business loans, hire purchase interest, lease payments.

**Insurance:** Public liability, professional indemnity, employer\'s liability, business contents insurance.

**Clothing:** Only protective clothing and uniforms with your business logo. Everyday clothing is not allowable, even if you only wear it for work.

**Subscriptions:** Trade body memberships, professional journals, business magazines.

**Bad debts:** Money owed to you that you have written off as uncollectable. You must have taken reasonable steps to recover it.`,
      },
      {
        heading: 'What You Cannot Claim',
        content: `These are the most common expenses that business owners try to claim but HMRC disallows:

**Client entertaining:** Meals, drinks, events, and hospitality for clients or potential clients. This includes taking a customer to lunch, buying them coffee, or taking them to a sporting event. HMRC considers this non-deductible regardless of whether it generates business.

**Fines and penalties:** Parking fines, speeding tickets, late filing penalties, court fines. Even if incurred during business activity, these are never allowable.

**Personal expenses:** Anything with a personal benefit that cannot be split from business use. This includes personal grooming, gym memberships (unless directly relevant to your trade), personal travel, and non-business clothing.

**Your own wages or drawings:** As a sole trader, money you take from the business for personal use is not a business expense. It is simply a withdrawal of profit. It does not appear on your tax return as an expense.

**Capital asset purchases (in full):** When you buy equipment, a vehicle, or furniture for your business, you cannot deduct the full cost in one year. Instead, you claim \'capital allowances\' over time through the Annual Investment Allowance (AIA), which lets most businesses deduct the full cost in the year of purchase anyway. The rules here are slightly different from standard expenses.

**Loan repayments:** You can claim the interest on a business loan, but not the capital repayment.

**Payments to yourself through a limited company:** Dividends and salary are not expenses of the company (salary is, but it goes through PAYE). This only applies if you operate through a limited company.`,
      },
      {
        heading: 'Simplified Expenses',
        content: `HMRC offers \'simplified expenses\' as an alternative to calculating the exact business proportion of certain costs. You can choose to use simplified rates or calculate actual costs \u2014 use whichever gives you the bigger deduction.

**Business mileage:** Instead of calculating fuel, insurance, servicing, and depreciation, you can claim a flat rate per mile:
- 45p per mile for the first 10,000 business miles in a tax year
- 25p per mile for business miles over 10,000
- 5p per mile for each passenger (if a colleague or employee travels with you on a business journey)

You cannot claim simplified mileage rates and actual vehicle costs for the same vehicle. Once you choose a method for a vehicle, you must stick with it for the life of that vehicle.

**Working from home:** HMRC offers simplified rates based on hours worked from home per month:
- 25-50 hours: \u00a310 per month
- 51-100 hours: \u00a318 per month
- 101+ hours: \u00a326 per month

Alternatively, you can calculate the actual business proportion of your home costs (mortgage interest, rent, council tax, utilities, insurance, broadband). This usually gives a larger deduction but requires more record-keeping.

**Living at your business premises:** If you live at your business premises (e.g., a guest house or care home), you can claim a flat monthly deduction instead of calculating the private use of the premises.`,
      },
      {
        heading: 'Keeping Records of Expenses',
        content: `For every expense you claim, you need evidence. HMRC can ask to see this at any point within their enquiry window (up to 5-6 years after the tax year).

**For each expense, keep:**
- A receipt, invoice, or bill showing the date, amount, supplier, and what was purchased
- A note of the business purpose (if it is not obvious from the receipt)
- Proof of payment (bank statement or card slip)

**A phone photo of a receipt is perfectly acceptable.** In fact, it is better than paper because it cannot fade, get lost, or be damaged. Set up a system:

1. Take a photo of every receipt as soon as you receive it
2. Save it to a cloud folder named with the tax year (e.g., \'2025-26 Receipts\')
3. Name the file with the date and supplier (e.g., \'2025-09-12_Staples_OfficeSupplies.jpg\')
4. Log the expense in your cash book or accounting software the same week

**For mileage:** Keep a log of every business journey. Our Mileage Log template is designed for exactly this. Record the date, starting point, destination, purpose, and miles travelled. You do not need to keep fuel receipts if you are claiming the simplified mileage rate.

**For home office claims:** If using actual costs, keep all your household bills (mortgage statement showing interest, council tax bill, utility bills, insurance, broadband). If using simplified rates, just keep a record of your hours worked from home.

The 15 minutes you spend each week recording expenses will save you hours at tax time and could save you hundreds of pounds by ensuring you claim everything you are entitled to.`,
      },
    ],
    faq: [
      {
        question: 'Can I claim coffee shop wifi if I work from a cafe?',
        answer: 'Yes, if you bought the coffee and used the wifi specifically for business work. The coffee itself is a grey area \u2014 some accountants argue it is part of a business expense (you needed to be there to work), while others say it is personal consumption. The wifi charge is clearly allowable if you paid for it separately.',
      },
      {
        question: 'Can I claim a Christmas party?',
        answer: 'If you are a sole trader with no employees, you cannot claim entertaining costs. If you have employees, you can claim up to \u00a3150 per head per year for an annual event (including partners). This is an exemption, not an expense deduction \u2014 meaning the cost is simply not taxed as a benefit.',
      },
      {
        question: 'What if I lost a receipt?',
        answer: 'If you genuinely lost a receipt, you can still claim the expense if you have other evidence. A bank or card statement showing the payment, plus a note of what was purchased, is usually acceptable. HMRC understands that receipts get lost. But try to keep proper records \u2014 repeated claims without evidence may trigger an enquiry.',
      },
    ],
  },

  // =====================================================
  //  GUIDE 8: Cash Basis vs Accrual Accounting
  // =====================================================
  {
    id: 'cash-vs-accrual',
    title: 'Cash Basis vs Accrual Accounting: Which Is Right for Your Business?',
    description: 'The difference between cash basis and accrual accounting, explained simply. Learn which method suits your business and how to switch.',
    category: 'bookkeeping',
    readTime: '7 min read',
    lastUpdated: 'June 2026',
    slug: 'cash-vs-accrual',
    relatedTemplates: ['cash-book', 'cash-book-balance'],
    relatedGuides: ['what-is-bookkeeping', 'sole-trader-guide'],
    sections: [
      {
        heading: 'At a Glance',
        content: '',
        bullets: [
          'Cash basis records income when received and expenses when paid \u2014 simpler, suited to most small businesses',
          'Accrual accounting records income when earned and expenses when incurred \u2014 more accurate, required for limited companies',
          'From April 2024, cash basis is the default for eligible sole traders and partnerships',
          'There is no longer a turnover threshold for cash basis \u2014 the old \u00a3150,000 limit was removed',
          'Limited companies must use accrual accounting \u2014 they cannot use cash basis',
          'You can switch between methods, but the best time to do so is at the start of a new tax year',
        ],
      },
      {
        heading: 'What Is the Difference?',
        content: `The key difference between cash accounting and accrual accounting is timing \u2014 when you record income and expenses in your books.

**Cash basis accounting:** You record income when money actually arrives in your bank account. You record expenses when money actually leaves your account. It is exactly like tracking your personal bank balance.

**Accrual accounting:** You record income when you earn it \u2014 usually when you send an invoice, not when you get paid. You record expenses when you incur them \u2014 usually when you receive a bill, not when you pay it.

**A simple example:**

You complete a project for a client in March and send an invoice for \u00a32,000. The client pays in April. You also receive a supplier\'s bill in March for \u00a3500 but pay it in April.

Under **cash basis**, the \u00a32,000 income appears in April\'s books and the \u00a3500 expense appears in April\'s books. March shows neither.

Under **accrual accounting**, both the \u00a32,000 income and the \u00a3500 expense appear in March\'s books, because that is when they were earned and incurred.

Neither method is \'correct\' or \'incorrect\'. They are measuring different things. Cash basis shows your actual cash position. Accrual accounting shows your business\'s financial performance more accurately because it includes money you are owed and bills you need to pay.`,
      },
      {
        heading: 'Who Uses Which Method?',
        content: `Your business structure determines which method you can use:`,
        table: {
          headers: ['Business Type', 'Default Method', 'Can You Switch?'],
          rows: [
            ['Sole traders', 'Cash basis (from April 2024)', 'Yes \u2014 opt out on your tax return'],
            ['Self-employed freelancers', 'Cash basis (from April 2024)', 'Yes \u2014 opt out on your tax return'],
            ['Landlords', 'Cash basis (from April 2024)', 'Yes \u2014 opt out on your tax return'],
            ['Partnerships (no corporate partners)', 'Cash basis (from April 2024)', 'Yes \u2014 opt out on your tax return'],
            ['Limited companies', 'Accrual (required)', 'No \u2014 limited companies must use accrual'],
            ['LLPs', 'Accrual (required)', 'No'],
          ],
        },
      },
      {
        heading: 'Advantages and Disadvantages',
        content: `**Cash Basis Advantages:**
- Simpler to understand and manage \u2014 no need to track debtors and creditors
- You only pay tax on money you have actually received
- Better for cash flow \u2014 you are not paying tax on income you have not collected yet
- Fewer records to keep \u2014 no need to track unpaid invoices or upcoming bills
- Works well with simple spreadsheet bookkeeping

**Cash Basis Disadvantages:**
- Can give a misleading picture if you have lots of unpaid invoices or upcoming bills
- Not suitable if you need detailed financial reports (e.g., for investors or lenders)
- Some businesses find it harder to spot trends when income and expenses are recorded based on payment timing rather than when the work was done

**Accrual Accounting Advantages:**
- More accurate picture of your business\'s financial health
- Required for limited companies and often expected by lenders and investors
- Helps you see trends because income and expenses are matched to the period they relate to
- Better for businesses with stock or work-in-progress

**Accrual Accounting Disadvantages:**
- More complex \u2014 you need to track accounts receivable, accounts payable, prepayments, and accruals
- You might pay tax on income before you have received it
- Usually requires accounting software or professional help
- More time-consuming`,
      },
      {
        heading: 'How to Switch from Cash Basis to Accrual',
        content: `If you decide accrual accounting would suit your business better, the best time to switch is the start of a new tax year (6 April).

**Step 1:** Choose your start date. The beginning of a tax year keeps things clean.

**Step 2:** Record what you are owed. List all unpaid invoices you have sent to customers. These become your \'accounts receivable\' opening balance.

**Step 3:** Record what you owe. List all unpaid bills you have received from suppliers. These become your \'accounts payable\' opening balance.

**Step 4:** Record any stock. If you hold stock or work-in-progress, record its value as an asset at the switchover date.

**Step 5:** Adjust for prepayments. If you have paid in advance for anything \u2014 insurance, subscriptions, rent \u2014 record the unused portion as an asset.

**Step 6:** Tell HMRC. You do not need to contact them separately. Just indicate on your Self Assessment tax return that you are using traditional (accrual) accounting rather than cash basis.

**Step 7:** Update your software or spreadsheet. If you use accounting software, there is usually a setting to change your accounting method. If you use a spreadsheet, add columns for accounts receivable and accounts payable.

**Warning:** Switching can affect your tax bill in the transition year. Some income or expenses may be counted twice or not at all. If your accounts are complex, speak to an accountant before switching.`,
        callout: {
          type: 'tip',
          text: 'Most sole traders and landlords are perfectly well served by cash basis accounting. Do not feel pressured to use accrual accounting unless your business structure requires it or your accountant advises it for a specific reason.',
        },
      },
    ],
    faq: [
      {
        question: 'Can I use cash basis if I have stock?',
        answer: 'Yes, you can use cash basis with stock. However, if stock is a significant part of your business, accrual accounting usually gives a more accurate picture because it properly matches the cost of goods sold to the sales revenue. Under cash basis, you might record a large stock purchase in one month and the sales across several months, making your profit look uneven.',
      },
      {
        question: 'Does cash basis affect my VAT returns?',
        answer: 'No. Your choice of income tax accounting method (cash basis or accrual) is separate from how you account for VAT. For VAT, you can choose the VAT Cash Accounting Scheme (record VAT when cash moves) or the standard scheme (record VAT when invoices are issued), regardless of which income tax method you use.',
      },
      {
        question: 'Can I switch back from accrual to cash basis?',
        answer: 'Yes, provided you are eligible for cash basis. You can switch at the start of a new tax year. You will need to make transitional adjustments \u2014 essentially reversing the process described above. Any income already taxed under accruals that you have not yet received can be excluded, and any expenses already claimed that you have not yet paid may need to be adjusted.',
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(categoryId: string): Guide[] {
  return guides.filter((g) => g.category === categoryId);
}

export function getRelatedTemplates(guide: Guide) {
  return guide.relatedTemplates || [];
}

export function getRelatedGuides(guide: Guide): Guide[] {
  if (!guide.relatedGuides) return [];
  return guides.filter((g) => guide.relatedGuides?.includes(g.id));
}
