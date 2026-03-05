import { Calculator, FileCheck, Globe, Coins, Heart, TrendingUp, Shield, Building2, CreditCard, Landmark, Receipt, CheckCircle2, ClipboardList, Briefcase, Award, Users, Home, BookOpen, Scale, Banknote, PiggyBank } from "lucide-react";

export interface ToolField {
  name: string;
  label: string;
  type: "number" | "text" | "select";
  options?: string[];
  placeholder?: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  fields: ToolField[];
  prompt: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: any;
  tools: Tool[];
}

export const categories: Category[] = [
  {
    id: "income-tax",
    title: "Income Tax Tools",
    description: "AI tools for personal income tax planning and compliance.",
    icon: Calculator,
    tools: [
      {
        id: "income-tax-saving",
        title: "Income Tax Saving Tool",
        description: "Comprehensive tax saving analysis under Old and New regime.",
        icon: Calculator,
        fields: [
          { name: "age", label: "Age", type: "number" },
          { name: "residential_status", label: "Residential Status", type: "select", options: ["Resident", "NRI"] },
          { name: "salary_income", label: "Annual Salary Income (₹)", type: "number" },
          { name: "business_income", label: "Business Income (₹)", type: "number" },
          { name: "other_income", label: "Other Income (₹)", type: "number" },
          { name: "investment_80c", label: "Existing 80C Investments (₹)", type: "number" },
          { name: "insurance_80d", label: "Health Insurance Premium 80D (₹)", type: "number" },
          { name: "home_loan_interest", label: "Home Loan Interest Sec 24 (₹)", type: "number" },
          { name: "hra_received", label: "HRA Received (₹)", type: "number" },
          { name: "rent_paid", label: "Rent Paid (₹)", type: "number" },
          { name: "nps", label: "NPS Investment 80CCD (₹)", type: "number" },
          { name: "donations", label: "Donations 80G (₹)", type: "number" },
        ],
        prompt: `You are an expert Indian Chartered Accountant specializing in the Income Tax Act, 1961 and latest Finance Act provisions.

Analyze the following taxpayer data and provide tax saving guidance.

Inputs:
Age: {age}
Residential Status: {residential_status}
Annual Salary Income: ₹{salary_income}
Business Income: ₹{business_income}
Other Income: ₹{other_income}
Existing 80C Investments: ₹{investment_80c}
Health Insurance Premium (80D): ₹{insurance_80d}
Home Loan Interest (Sec 24): ₹{home_loan_interest}
HRA Received: ₹{hra_received}
Rent Paid: ₹{rent_paid}
NPS Investment: ₹{nps}
Donations (80G): ₹{donations}

Provide:
1. Total taxable income
2. Tax calculation under Old Regime
3. Tax calculation under New Regime
4. Comparison of tax liability
5. Remaining deductions available
6. Recommended tax saving investments
7. Final recommendation of best regime

Follow latest Indian tax laws and include a disclaimer that this is general guidance.`,
      },
      {
        id: "finance-health",
        title: "Personal Finance Health Score",
        description: "Get an AI-generated financial health score with actionable insights.",
        icon: Heart,
        fields: [
          { name: "income", label: "Monthly Income (₹)", type: "number" },
          { name: "emi", label: "Monthly EMI (₹)", type: "number" },
          { name: "savings", label: "Total Savings (₹)", type: "number" },
          { name: "investments", label: "Total Investments (₹)", type: "number" },
          { name: "health_insurance", label: "Health Insurance", type: "select", options: ["Yes", "No"] },
          { name: "life_insurance", label: "Life Insurance", type: "select", options: ["Yes", "No"] },
          { name: "dependents", label: "Number of Dependents", type: "number" },
        ],
        prompt: `You are a certified financial planner.

Evaluate the user's financial health using standard financial planning benchmarks.

Inputs:
Monthly Income: ₹{income}
Monthly EMI: ₹{emi}
Total Savings: ₹{savings}
Total Investments: ₹{investments}
Health Insurance: {health_insurance}
Life Insurance: {life_insurance}
Number of Dependents: {dependents}

Provide:
1. Financial Health Score (0-100)
2. Debt to income ratio
3. Emergency fund adequacy
4. Insurance adequacy
5. Investment status
6. Financial risk level
7. Top 3 improvement suggestions`,
      },
      {
        id: "advance-tax",
        title: "Advance Tax Calculator",
        description: "Calculate advance tax liability with quarterly installment breakup.",
        icon: TrendingUp,
        fields: [
          { name: "income", label: "Estimated Annual Income (₹)", type: "number" },
          { name: "business_income", label: "Business Income (₹)", type: "number" },
          { name: "capital_gain", label: "Capital Gains Income (₹)", type: "number" },
          { name: "interest_income", label: "Interest Income (₹)", type: "number" },
          { name: "tds", label: "TDS Already Deducted (₹)", type: "number" },
          { name: "advance_tax", label: "Advance Tax Already Paid (₹)", type: "number" },
        ],
        prompt: `You are an Indian tax advisor.

Calculate advance tax liability as per Income Tax Act.

Inputs:
Estimated Annual Income ₹{income}
Business Income ₹{business_income}
Capital Gains Income ₹{capital_gain}
Interest Income ₹{interest_income}
TDS Already Deducted ₹{tds}
Advance Tax Already Paid ₹{advance_tax}

Provide:
1. Estimated total tax liability
2. Remaining tax payable
3. Advance tax installment breakup
4. Applicable due dates
5. Interest risk under sections 234B and 234C
6. Compliance recommendations`,
      },
      {
        id: "hra-calculator",
        title: "HRA Exemption Calculator",
        description: "Calculate HRA exemption under Section 10(13A).",
        icon: Home,
        fields: [
          { name: "basic_salary", label: "Basic Salary (₹)", type: "number" },
          { name: "hra_received", label: "HRA Received (₹)", type: "number" },
          { name: "rent_paid", label: "Rent Paid (₹)", type: "number" },
          { name: "metro_or_non_metro", label: "City Type", type: "select", options: ["Metro", "Non-Metro"] },
        ],
        prompt: `You are an expert in Indian salary taxation.

Calculate HRA exemption under Section 10(13A).

Inputs:
Basic Salary ₹{basic_salary}
HRA Received ₹{hra_received}
Rent Paid ₹{rent_paid}
City Type {metro_or_non_metro}

Provide:
1. HRA exemption calculation
2. Taxable HRA amount
3. Total tax benefit
4. Explanation of rule applied`,
      },
      {
        id: "80c-planner",
        title: "Section 80C Optimization Planner",
        description: "Optimize your 80C investments for maximum tax savings.",
        icon: PiggyBank,
        fields: [
          { name: "income", label: "Annual Income (₹)", type: "number" },
          { name: "pf", label: "PF Contribution (₹)", type: "number" },
          { name: "life_insurance", label: "Life Insurance Premium (₹)", type: "number" },
          { name: "elss", label: "ELSS Investment (₹)", type: "number" },
          { name: "home_loan_principal", label: "Home Loan Principal (₹)", type: "number" },
          { name: "other", label: "Other 80C Investments (₹)", type: "number" },
        ],
        prompt: `You are a tax planning expert.

Analyze the user's Section 80C utilization.

Inputs:
Annual Income ₹{income}
PF Contribution ₹{pf}
Life Insurance Premium ₹{life_insurance}
ELSS Investment ₹{elss}
Home Loan Principal ₹{home_loan_principal}
Other 80C Investments ₹{other}

Provide:
1. Total 80C used
2. Remaining limit available
3. Suggested investment options
4. Maximum tax saving potential`,
      },
    ],
  },
  {
    id: "business-gst",
    title: "Business & GST Tools",
    description: "GST compliance, registration, and business advisory tools.",
    icon: Building2,
    tools: [
      {
        id: "gst-checker",
        title: "GST Applicability Checker",
        description: "Check if GST applies to your business and get compliance guidance.",
        icon: FileCheck,
        fields: [
          { name: "business", label: "Nature of Business", type: "text" },
          { name: "turnover", label: "Annual Turnover (₹)", type: "number" },
          { name: "state", label: "State", type: "text" },
          { name: "category", label: "Business Category", type: "select", options: ["Goods", "Services", "Both"] },
        ],
        prompt: `You are an expert Indian GST consultant. Analyze the following business data and determine GST applicability.

Business: {business}
Annual Turnover: ₹{turnover}
State: {state}
Category: {category}

Provide:
1. GST registration requirement
2. Applicable GST rate
3. Compliance obligations
4. Filing schedule
5. Available exemptions`,
      },
      {
        id: "gst-registration",
        title: "GST Registration Requirement Tool",
        description: "Determine if your business needs GST registration.",
        icon: ClipboardList,
        fields: [
          { name: "turnover", label: "Annual Turnover (₹)", type: "number" },
          { name: "state", label: "State of Business", type: "text" },
          { name: "business_type", label: "Business Type", type: "select", options: ["Manufacturer", "Trader", "Service Provider", "E-commerce"] },
          { name: "interstate", label: "Interstate Supply", type: "select", options: ["Yes", "No"] },
        ],
        prompt: `You are a GST registration advisor. Determine if GST registration is mandatory.

Annual Turnover: ₹{turnover}
State: {state}
Business Type: {business_type}
Interstate Supply: {interstate}

Provide:
1. Registration requirement (mandatory/voluntary)
2. Applicable threshold limit
3. Registration type recommended
4. Documents required
5. Timeline and process`,
      },
      {
        id: "gst-late-fee",
        title: "GST Late Fee Calculator",
        description: "Calculate late fees and interest for delayed GST filing.",
        icon: Receipt,
        fields: [
          { name: "return_type", label: "Return Type", type: "select", options: ["GSTR-1", "GSTR-3B", "GSTR-9"] },
          { name: "due_date", label: "Due Date (YYYY-MM-DD)", type: "text" },
          { name: "filing_date", label: "Filing Date (YYYY-MM-DD)", type: "text" },
          { name: "tax_liability", label: "Tax Liability (₹)", type: "number" },
        ],
        prompt: `You are a GST compliance expert. Calculate late filing penalties.

Return Type: {return_type}
Due Date: {due_date}
Filing Date: {filing_date}
Tax Liability: ₹{tax_liability}

Provide:
1. Number of days delayed
2. Late fee calculation
3. Interest calculation under Section 50
4. Total penalty amount
5. Recommendations to avoid future penalties`,
      },
      {
        id: "itc-eligibility",
        title: "Input Tax Credit Eligibility Checker",
        description: "Check if your purchases qualify for Input Tax Credit.",
        icon: CheckCircle2,
        fields: [
          { name: "purchase_type", label: "Type of Purchase", type: "text" },
          { name: "gst_paid", label: "GST Paid on Purchase (₹)", type: "number" },
          { name: "business_use", label: "Business Use", type: "select", options: ["100% Business", "Partial Business", "Personal"] },
          { name: "supplier_filed", label: "Supplier Filed GSTR-1", type: "select", options: ["Yes", "No", "Not Sure"] },
        ],
        prompt: `You are an ITC specialist under Indian GST law. Analyze ITC eligibility.

Purchase Type: {purchase_type}
GST Paid: ₹{gst_paid}
Business Use: {business_use}
Supplier Filed GSTR-1: {supplier_filed}

Provide:
1. ITC eligibility status
2. Eligible ITC amount
3. Blocked credit analysis (Section 17(5))
4. Documentation requirements
5. Compliance checklist`,
      },
      {
        id: "composition-scheme",
        title: "Composition Scheme Eligibility",
        description: "Check eligibility for GST Composition Scheme.",
        icon: Award,
        fields: [
          { name: "turnover", label: "Annual Turnover (₹)", type: "number" },
          { name: "business_type", label: "Business Type", type: "select", options: ["Manufacturer", "Trader", "Restaurant", "Service Provider"] },
          { name: "interstate", label: "Interstate Supply", type: "select", options: ["Yes", "No"] },
        ],
        prompt: `You are a GST advisor. Evaluate Composition Scheme eligibility.

Annual Turnover: ₹{turnover}
Business Type: {business_type}
Interstate Supply: {interstate}

Provide:
1. Eligibility status
2. Applicable tax rate
3. Benefits of composition scheme
4. Limitations and restrictions
5. Recommendation`,
      },
      {
        id: "business-structure",
        title: "Business Structure Advisor",
        description: "Get AI advice on the best legal structure for your business.",
        icon: Briefcase,
        fields: [
          { name: "business_type", label: "Nature of Business", type: "text" },
          { name: "partners", label: "Number of Founders/Partners", type: "number" },
          { name: "revenue", label: "Expected Annual Revenue (₹)", type: "number" },
          { name: "funding", label: "Planning to Raise Funding", type: "select", options: ["Yes", "No"] },
        ],
        prompt: `You are a business advisory expert in India. Recommend the best business structure.

Business: {business_type}
Founders/Partners: {partners}
Expected Revenue: ₹{revenue}
Raising Funding: {funding}

Provide:
1. Recommended structure (Sole Prop / Partnership / LLP / Pvt Ltd / OPC)
2. Tax implications
3. Compliance requirements
4. Registration process
5. Pros and cons comparison`,
      },
      {
        id: "startup-compliance",
        title: "Startup Compliance Checklist",
        description: "Get a comprehensive compliance checklist for your startup.",
        icon: ClipboardList,
        fields: [
          { name: "entity_type", label: "Entity Type", type: "select", options: ["Pvt Ltd", "LLP", "OPC", "Partnership"] },
          { name: "industry", label: "Industry", type: "text" },
          { name: "employees", label: "Number of Employees", type: "number" },
          { name: "turnover", label: "Annual Turnover (₹)", type: "number" },
        ],
        prompt: `You are a startup compliance advisor in India. Generate a compliance checklist.

Entity Type: {entity_type}
Industry: {industry}
Employees: {employees}
Annual Turnover: ₹{turnover}

Provide:
1. Mandatory registrations
2. Tax compliance requirements
3. Labour law compliance
4. Annual filing requirements
5. Startup India benefits eligibility
6. Key deadlines`,
      },
      {
        id: "msme-benefits",
        title: "MSME Benefits Eligibility",
        description: "Check your eligibility for MSME benefits and schemes.",
        icon: Landmark,
        fields: [
          { name: "investment", label: "Investment in Plant & Machinery (₹)", type: "number" },
          { name: "turnover", label: "Annual Turnover (₹)", type: "number" },
          { name: "sector", label: "Sector", type: "select", options: ["Manufacturing", "Services"] },
        ],
        prompt: `You are an MSME policy expert. Evaluate MSME classification and benefits.

Investment in Plant & Machinery: ₹{investment}
Annual Turnover: ₹{turnover}
Sector: {sector}

Provide:
1. MSME classification (Micro/Small/Medium)
2. Eligible government schemes
3. Credit guarantee benefits
4. Tax benefits
5. Registration process`,
      },
    ],
  },
  {
    id: "nri-international",
    title: "NRI & International Tax",
    description: "Tax residency, DTAA benefits, and FEMA compliance tools.",
    icon: Globe,
    tools: [
      {
        id: "nri-residency",
        title: "NRI Tax Residency Analyzer",
        description: "Determine your tax residency status under Indian tax law.",
        icon: Globe,
        fields: [
          { name: "days", label: "Days Stayed in India (this FY)", type: "number" },
          { name: "country", label: "Country of Residence", type: "text" },
          { name: "indian_income", label: "Indian Income (₹)", type: "number" },
          { name: "foreign_income", label: "Foreign Income (₹)", type: "number" },
          { name: "previous_years_days", label: "Days in India (Previous 4 FYs Total)", type: "number" },
        ],
        prompt: `You are an expert in NRI taxation under Indian Income Tax Act Section 6.

Days in India (Current FY): {days}
Country of Residence: {country}
Indian Income: ₹{indian_income}
Foreign Income: ₹{foreign_income}
Days in India (Previous 4 FYs): {previous_years_days}

Provide:
1. Residential status (ROR/RNOR/NR)
2. Tax implications on Indian income
3. Tax implications on foreign income
4. DTAA benefits if applicable
5. Compliance requirements`,
      },
      {
        id: "dtaa-analyzer",
        title: "DTAA Benefit Analyzer",
        description: "Analyze Double Tax Avoidance Agreement benefits.",
        icon: Scale,
        fields: [
          { name: "country", label: "Country", type: "text" },
          { name: "income_type", label: "Income Type", type: "select", options: ["Salary", "Dividend", "Interest", "Capital Gains", "Royalty"] },
          { name: "income_amount", label: "Income Amount (₹)", type: "number" },
          { name: "tax_paid_abroad", label: "Tax Paid Abroad (₹)", type: "number" },
        ],
        prompt: `You are a DTAA specialist. Analyze treaty benefits.

Country: {country}
Income Type: {income_type}
Income Amount: ₹{income_amount}
Tax Paid Abroad: ₹{tax_paid_abroad}

Provide:
1. Applicable DTAA provisions
2. Tax rate under treaty
3. Tax credit available
4. Relief amount
5. Documentation required`,
      },
      {
        id: "fema-compliance",
        title: "FEMA Compliance Checker",
        description: "Check FEMA approval and RBI compliance requirements.",
        icon: Shield,
        fields: [
          { name: "transaction_type", label: "Type of Transaction", type: "text" },
          { name: "residency_status", label: "Residency Status", type: "select", options: ["Resident", "NRI"] },
          { name: "country", label: "Country", type: "text" },
          { name: "amount", label: "Transaction Amount (₹)", type: "number" },
        ],
        prompt: `You are an expert in Indian FEMA regulations and RBI compliance.

Transaction Type: {transaction_type}
Residency Status: {residency_status}
Country: {country}
Amount: ₹{amount}

Provide:
1. FEMA approval requirement
2. RBI compliance requirements
3. LRS limits applicable
4. Reporting obligations
5. Documentation needed
6. Penalties for non-compliance`,
      },
      {
        id: "nri-property-tax",
        title: "NRI Property Tax Calculator",
        description: "Calculate tax on property transactions for NRIs.",
        icon: Home,
        fields: [
          { name: "property_type", label: "Property Type", type: "select", options: ["Residential", "Commercial", "Land"] },
          { name: "purchase_price", label: "Purchase Price (₹)", type: "number" },
          { name: "sale_price", label: "Sale Price (₹)", type: "number" },
          { name: "holding_period", label: "Holding Period (months)", type: "number" },
          { name: "country", label: "Country of Residence", type: "text" },
        ],
        prompt: `You are an NRI property tax advisor.

Property Type: {property_type}
Purchase Price: ₹{purchase_price}
Sale Price: ₹{sale_price}
Holding Period: {holding_period} months
Country of Residence: {country}

Provide:
1. Capital gains classification (STCG/LTCG)
2. Indexation benefit
3. Tax liability in India
4. TDS requirement
5. DTAA benefit
6. Repatriation rules`,
      },
      {
        id: "foreign-income-tax",
        title: "Foreign Income Taxability Checker",
        description: "Check if your foreign income is taxable in India.",
        icon: Banknote,
        fields: [
          { name: "residency", label: "Residency Status", type: "select", options: ["Resident", "RNOR", "NRI"] },
          { name: "income_type", label: "Income Type", type: "select", options: ["Salary", "Rental", "Dividend", "Capital Gains", "Business"] },
          { name: "amount", label: "Foreign Income Amount (₹)", type: "number" },
          { name: "country", label: "Source Country", type: "text" },
          { name: "tax_paid", label: "Tax Paid in Foreign Country (₹)", type: "number" },
        ],
        prompt: `You are an international tax expert specializing in Indian tax law.

Residency Status: {residency}
Income Type: {income_type}
Foreign Income: ₹{amount}
Source Country: {country}
Tax Paid Abroad: ₹{tax_paid}

Provide:
1. Taxability in India
2. Applicable tax rate
3. Foreign tax credit available
4. DTAA provisions
5. Filing requirements
6. Compliance recommendations`,
      },
    ],
  },
  {
    id: "wealth-asset",
    title: "Wealth & Asset Tools",
    description: "Digital gold, capital gains, and loan eligibility tools.",
    icon: Coins,
    tools: [
      {
        id: "digital-gold-tax",
        title: "Digital Gold Tax Calculator",
        description: "Calculate capital gains tax on digital gold investments.",
        icon: Coins,
        fields: [
          { name: "buy_price", label: "Buy Price (₹)", type: "number" },
          { name: "sell_price", label: "Sell Price (₹)", type: "number" },
          { name: "holding_period", label: "Holding Period (months)", type: "number" },
        ],
        prompt: `You are an Indian tax advisor specializing in digital gold taxation.

Buy Price: ₹{buy_price}
Sell Price: ₹{sell_price}
Holding Period: {holding_period} months

Provide:
1. Capital gains amount
2. LTCG or STCG classification
3. Applicable tax rate
4. Estimated tax liability
5. Available exemptions`,
      },
      {
        id: "loan-eligibility",
        title: "Loan Eligibility Analyzer",
        description: "Check your loan eligibility with AI-powered analysis.",
        icon: CreditCard,
        fields: [
          { name: "income", label: "Monthly Income (₹)", type: "number" },
          { name: "emi", label: "Existing Monthly EMI (₹)", type: "number" },
          { name: "credit_score", label: "Credit Score", type: "number" },
          { name: "loan_type", label: "Loan Type", type: "select", options: ["Home Loan", "Personal Loan", "Car Loan", "Business Loan"] },
          { name: "employment", label: "Employment Type", type: "select", options: ["Salaried", "Self-Employed", "Business Owner"] },
        ],
        prompt: `You are a banking credit analyst.

Monthly Income: ₹{income}
Monthly EMI: ₹{emi}
Credit Score: {credit_score}
Loan Type: {loan_type}
Employment Type: {employment}

Provide:
1. Maximum loan eligibility
2. EMI affordability
3. Debt to income ratio
4. Risk assessment
5. Recommendation`,
      },
    ],
  },
];
