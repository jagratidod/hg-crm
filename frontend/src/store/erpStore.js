import { create } from 'zustand';

// List of available roles
export const ROLES = [
  'Super Admin',
  'Factory Owner',
  'Production Manager',
  'Department Manager',
  'CAD Designer',
  'Craftman / Karigar',
  'Casting Staff',
  'Stone Setter',
  'QC Staff',
  'Inventory Manager',
  'Salesman',
  'Accountant',
  'Dispatch Staff',
  'Hallmark Staff',
];

// List of 25 Jewellery Manufacturing Departments
export const DEPARTMENTS = [
  { id: 1, name: 'Design Department', code: 'DSN', progress: 100, type: 'Against Weight', process: 'Manufacturing', autoLoss: 0.1, autoProfit: 0, calcStock: true, activeUsers: 4 },
  { id: 2, name: 'CAD Department', code: 'CAD', progress: 100, type: 'Against Weight', process: 'Manufacturing', autoLoss: 0, autoProfit: 0, calcStock: false, activeUsers: 3 },
  { id: 3, name: 'CAM / 3D Printing Department', code: 'CAM', progress: 95, type: 'Against Weight', process: 'Manufacturing', autoLoss: 0.2, autoProfit: 0, calcStock: true, activeUsers: 2 },
  { id: 4, name: 'Rubber Mould Department', code: 'RMD', progress: 90, type: 'Weight Wise', process: 'Manufacturing', autoLoss: 0, autoProfit: 0, calcStock: false, activeUsers: 2 },
  { id: 5, name: 'Wax Injection Department', code: 'WAX', progress: 85, type: 'Weight Wise', process: 'Manufacturing', autoLoss: 0.3, autoProfit: 0, calcStock: true, activeUsers: 5 },
  { id: 6, name: 'Tree Making Department', code: 'TRE', progress: 80, type: 'Weight Wise', process: 'Melting', autoLoss: 0.5, autoProfit: 0, calcStock: true, activeUsers: 3 },
  { id: 7, name: 'Investment Department', code: 'INV', progress: 75, type: 'Weight Wise', process: 'Melting', autoLoss: 0.1, autoProfit: 0, calcStock: true, activeUsers: 2 },
  { id: 8, name: 'Burnout Department', code: 'BRN', progress: 70, type: 'Weight Wise', process: 'Melting', autoLoss: 0.2, autoProfit: 0, calcStock: true, activeUsers: 2 },
  { id: 9, name: 'Casting Department', code: 'CST', progress: 65, type: 'Weight Wise', process: 'Melting', autoLoss: 2.5, autoProfit: 0, calcStock: true, activeUsers: 6 },
  { id: 10, name: 'Cutting Department', code: 'CUT', progress: 60, type: 'Weight Wise', process: 'Manufacturing', autoLoss: 1.0, autoProfit: 0, calcStock: true, activeUsers: 4 },
  { id: 11, name: 'Filing Department', code: 'FLG', progress: 55, type: 'Weight Wise', process: 'Manufacturing', autoLoss: 3.5, autoProfit: 0, calcStock: true, activeUsers: 8 },
  { id: 12, name: 'Assembly / Soldering Department', code: 'ASM', progress: 50, type: 'Weight Wise', process: 'Manufacturing', autoLoss: 1.5, autoProfit: 0, calcStock: true, activeUsers: 7 },
  { id: 13, name: 'Pre-Polish Department', code: 'PRP', progress: 45, type: 'Weight Wise', process: 'Manufacturing', autoLoss: 2.0, autoProfit: 0, calcStock: true, activeUsers: 5 },
  { id: 14, name: 'Stone Setting Department', code: 'STN', progress: 40, type: 'Against Weight', process: 'Manufacturing', autoLoss: 0.5, autoProfit: 0, calcStock: true, activeUsers: 9 },
  { id: 15, name: 'Laser Welding Department', code: 'LSR', progress: 35, type: 'Against Weight', process: 'Manufacturing', autoLoss: 0.1, autoProfit: 0, calcStock: true, activeUsers: 3 },
  { id: 16, name: 'Final Polishing Department', code: 'POL', progress: 30, type: 'Weight Wise', process: 'Manufacturing', autoLoss: 4.0, autoProfit: 0, calcStock: true, activeUsers: 6 },
  { id: 17, name: 'Ultrasonic Cleaning Department', code: 'CLN', progress: 25, type: 'Weight Wise', process: 'Testing', autoLoss: 0.1, autoProfit: 0, calcStock: true, activeUsers: 2 },
  { id: 18, name: 'Plating Department', code: 'PLT', progress: 20, type: 'Weight Wise', process: 'Manufacturing', autoLoss: 0.3, autoProfit: 0.5, calcStock: true, activeUsers: 3 },
  { id: 19, name: 'Quality Check (QC) Department', code: 'QCD', progress: 15, type: 'Against Weight', process: 'Testing', autoLoss: 0, autoProfit: 0, calcStock: false, activeUsers: 4 },
  { id: 20, name: 'Hallmark Department', code: 'HLM', progress: 10, type: 'Against Weight', process: 'Testing', autoLoss: 0.1, autoProfit: 0, calcStock: false, activeUsers: 2 },
  { id: 21, name: 'Packing Department', code: 'PCK', progress: 5, type: 'Against Weight', process: 'Manufacturing', autoLoss: 0, autoProfit: 0, calcStock: false, activeUsers: 3 },
  { id: 22, name: 'Dispatch Department', code: 'DSP', progress: 0, type: 'Against Weight', process: 'Manufacturing', autoLoss: 0, autoProfit: 0, calcStock: false, activeUsers: 3 },
  { id: 23, name: 'Inventory & Store Department', code: 'STR', progress: 0, type: 'Against Weight', process: 'Manufacturing', autoLoss: 0, autoProfit: 0, calcStock: true, activeUsers: 4 },
  { id: 24, name: 'Refinery Department', code: 'REF', progress: 0, type: 'Weight Wise', process: 'Melting', autoLoss: 0, autoProfit: 10.0, calcStock: true, activeUsers: 2 },
  { id: 25, name: 'Accounts & ERP Department', code: 'ACT', progress: 0, type: 'Against Weight', process: 'Testing', autoLoss: 0, autoProfit: 0, calcStock: false, activeUsers: 3 },
];

export const BRANCHES = [
  'Mumbai Flagship',
  'Surat Factory Hub',
  'Jaipur Atelier',
  'Kolkata Craft Center',
  'Dubai International',
];

// Initial mock inventory data
const initialInventory = [
  { id: 'inv_1', category: 'Gold', status: 'In Stock', name: '24K Pure Gold Bullion', sku: 'GLD-24K-BAR', barcode: 'BAR-G1092', rfid: 'RFID-G0192', grossWeight: 10000.0, netWeight: 10000.0, fineWeight: 10000.0, purity: 0.999, karat: 24, stoneWeight: 0, diamondWeight: 0, makingCharges: 0, wastage: 0, finalPrice: 75200000, image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=200' },
  { id: 'inv_2', category: 'Gold', status: 'Low Stock', name: '22K Gold Grain Alloy', sku: 'GLD-22K-GRN', barcode: 'BAR-G2201', rfid: 'RFID-G2201', grossWeight: 5400.0, netWeight: 5400.0, fineWeight: 4950.0, purity: 0.916, karat: 22, stoneWeight: 0, diamondWeight: 0, makingCharges: 100, wastage: 2.5, finalPrice: 3800000, image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=200' },
  { id: 'inv_3', category: 'Silver', status: 'Reserved', name: '999 Fine Silver Grain', sku: 'SLV-999-GRN', barcode: 'BAR-S099', rfid: 'RFID-S099', grossWeight: 50000.0, netWeight: 50000.0, fineWeight: 50000.0, purity: 0.999, karat: 24, stoneWeight: 0, diamondWeight: 0, makingCharges: 0, wastage: 0, finalPrice: 4250000, image: 'https://images.unsplash.com/photo-1605557202138-097824c3fec2?auto=format&fit=crop&q=80&w=200' },
  { id: 'inv_4', category: 'Diamond', status: 'Out of Stock', name: 'Round Brilliant Diamond 0.5ct', sku: 'DMD-RND-050', barcode: 'BAR-D5001', rfid: 'RFID-D5001', grossWeight: 0.1, netWeight: 0.1, fineWeight: 0, purity: 1.0, karat: 0, stoneWeight: 0, diamondWeight: 0.5, makingCharges: 500, wastage: 0, finalPrice: 45000, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200' },
  { id: 'inv_5', category: 'Stone', status: 'Damaged', name: 'Natural Oval Emerald 1.2ct', sku: 'STN-EMR-120', barcode: 'BAR-E1202', rfid: 'RFID-E1202', grossWeight: 0.24, netWeight: 0.24, fineWeight: 0, purity: 0.98, karat: 0, stoneWeight: 1.2, diamondWeight: 0, makingCharges: 300, wastage: 0, finalPrice: 18000, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=200' },
  { id: 'inv_6', category: 'Finished Goods', status: 'In Stock', name: 'Adorn Gold Bridal Choker', sku: 'FG-NCK-G32', barcode: 'BAR-FG001', rfid: 'RFID-FG001', grossWeight: 68.4, netWeight: 62.1, fineWeight: 56.88, purity: 0.916, karat: 22, stoneWeight: 2.1, diamondWeight: 4.2, makingCharges: 450, wastage: 5.0, finalPrice: 512000, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=200' },
  { id: 'inv_7', category: 'Finished Goods', status: 'In Stock', name: 'Classic Solitaire Engagement Ring', sku: 'FG-RNG-D10', barcode: 'BAR-FG002', rfid: 'RFID-FG002', grossWeight: 4.8, netWeight: 4.6, fineWeight: 3.45, purity: 0.750, karat: 18, stoneWeight: 0, diamondWeight: 1.0, makingCharges: 800, wastage: 3.0, finalPrice: 195000, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200' }
];

// Initial mock job cards
const initialJobCards = [
  { id: 'JC-2026-001', barcode: 'BC-JC001', rfid: 'RFID-JC001', designNo: 'DES-NC-9812', productName: 'Gilded Royal Emerald Necklace', status: 'In Progress', currentDept: 'Casting Department', assignedCraftman: 'Rajesh Karigar', grossWeight: 45.60, netWeight: 42.10, stoneWeight: 3.50, diamondWeight: 0, stones: 'Emeralds: 12pcs, Round Cut', timeline: [
    { stage: 'Design Department', craftman: 'Amit Mehta', date: '2026-05-20', status: 'Completed', loss: 0 },
    { stage: 'CAD Department', craftman: 'Sonia Designer', date: '2026-05-21', status: 'Completed', loss: 0 },
    { stage: 'CAM / 3D Printing Department', craftman: 'Karan Singh', date: '2026-05-22', status: 'Completed', loss: 0.12 },
    { stage: 'Wax Injection Department', craftman: 'Vikram Seth', date: '2026-05-22', status: 'Completed', loss: 0.05 },
    { stage: 'Casting Department', craftman: 'Rajesh Karigar', date: '2026-05-23', status: 'In Progress', loss: 0.45 },
  ], qcStatus: 'Pending', reworkCount: 0, priority: 'High', dueDate: '2026-05-30', notes: 'Urgent bridal order' },
  { id: 'JC-2026-002', barcode: 'BC-JC002', rfid: 'RFID-JC002', designNo: 'DES-RG-4310', productName: 'Classic Cushion Cut Diamond Ring', status: 'Pending', currentDept: 'Filing Department', assignedCraftman: 'Haresh Solanki', grossWeight: 6.80, netWeight: 5.20, stoneWeight: 0, diamondWeight: 1.60, stones: 'Solitaire Cushion Cut: 1.6ct', timeline: [
    { stage: 'Design Department', craftman: 'Amit Mehta', date: '2026-05-21', status: 'Completed', loss: 0 },
    { stage: 'CAD Department', craftman: 'Sonia Designer', date: '2026-05-22', status: 'Completed', loss: 0 },
    { stage: 'Casting Department', craftman: 'Vijay Patel', date: '2026-05-23', status: 'Completed', loss: 0.15 },
    { stage: 'Filing Department', craftman: 'Haresh Solanki', date: '2026-05-23', status: 'Pending', loss: 0 },
  ], qcStatus: 'Pending', reworkCount: 0, priority: 'Medium', dueDate: '2026-06-05', notes: 'Maintain high polish' },
  { id: 'JC-2026-003', barcode: 'BC-JC003', rfid: 'RFID-JC003', designNo: 'DES-ER-1021', productName: 'Vintage Chandelier Gold Earrings', status: 'Rework', currentDept: 'Stone Setting Department', assignedCraftman: 'Mansoor Karigar', grossWeight: 18.25, netWeight: 15.65, stoneWeight: 2.60, diamondWeight: 0, stones: 'Rubies: 8pcs Oval Cut', timeline: [
    { stage: 'Design Department', craftman: 'Amit Mehta', date: '2026-05-18', status: 'Completed', loss: 0 },
    { stage: 'Casting Department', craftman: 'Vijay Patel', date: '2026-05-19', status: 'Completed', loss: 0.32 },
    { stage: 'Filing Department', craftman: 'Haresh Solanki', date: '2026-05-20', status: 'Completed', loss: 0.28 },
    { stage: 'Assembly / Soldering Department', craftman: 'Sunil Verma', date: '2026-05-21', status: 'Completed', loss: 0.11 },
    { stage: 'Stone Setting Department', craftman: 'Mansoor Karigar', date: '2026-05-22', status: 'Rework', loss: 0.40 },
  ], qcStatus: 'Failed', reworkCount: 1, priority: 'High', dueDate: '2026-05-28', notes: 'Stone setting was loose in QC review' },
  { id: 'JC-2026-004', barcode: 'BC-JC004', rfid: 'RFID-JC004', designNo: 'DES-BR-5501', productName: 'Gold Filigree Antique Bracelet', status: 'QC Failed', currentDept: 'Quality Check (QC) Department', assignedCraftman: 'Preeti QC', grossWeight: 32.40, netWeight: 32.40, stoneWeight: 0, diamondWeight: 0, stones: 'None', timeline: [
    { stage: 'Casting Department', craftman: 'Vijay Patel', date: '2026-05-19', status: 'Completed', loss: 0.55 },
    { stage: 'Filing Department', craftman: 'Haresh Solanki', date: '2026-05-20', status: 'Completed', loss: 0.45 },
    { stage: 'Final Polishing Department', craftman: 'Mahesh Kumar', date: '2026-05-22', status: 'Completed', loss: 0.88 },
    { stage: 'Quality Check (QC) Department', craftman: 'Preeti QC', date: '2026-05-23', status: 'QC Failed', loss: 0 },
  ], qcStatus: 'Failed', reworkCount: 1, priority: 'Medium', dueDate: '2026-06-02', notes: 'Slight dent on edge' },
  { id: 'JC-2026-005', barcode: 'BC-JC005', rfid: 'RFID-JC005', designNo: 'DES-NC-9021', productName: 'Premium Diamond Solitaire Pendant', status: 'Completed', currentDept: 'Packing Department', assignedCraftman: 'Simran Singh', grossWeight: 5.42, netWeight: 5.22, stoneWeight: 0, diamondWeight: 1.0, stones: 'Solitaire Diamond 1ct: 1pc', timeline: [
    { stage: 'Design Department', craftman: 'Amit Mehta', date: '2026-05-20', status: 'Completed', loss: 0 },
    { stage: 'Stone Setting Department', craftman: 'Mansoor Karigar', date: '2026-05-21', status: 'Completed', loss: 0.05 },
    { stage: 'Quality Check (QC) Department', craftman: 'Preeti QC', date: '2026-05-22', status: 'Completed', loss: 0 },
    { stage: 'Packing Department', craftman: 'Simran Singh', date: '2026-05-23', status: 'Completed', loss: 0 }
  ], qcStatus: 'Approved', reworkCount: 0, priority: 'Low', dueDate: '2026-05-26', notes: 'Delivered in premium velvet box' }
];

// Initial mock user profiles
const initialUsers = [
  { id: 'USR-01', firstName: 'Rajesh', lastName: 'Kumar', name: 'Rajesh Karigar', mobileNumber: '+91 98765 43210', mailId: 'rajesh.k@luxurygold.com', nationalId: 'AID-9812-4309', tradeNumber: 'TRD-GST-87', designation: 'Master Karigar', department: 'Casting Department', salaryType: 'Contract', address: '102 Karigar Colony, Surat, Gujarat', zipCode: '395003', bankDetails: 'HDFC Bank - Acc: 501002938102, IFSC: HDFC0000182', activeJobsCount: 2, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
  { id: 'USR-02', firstName: 'Mansoor', lastName: 'Khan', name: 'Mansoor Karigar', mobileNumber: '+91 99887 76655', mailId: 'mansoor.k@luxurygold.com', nationalId: 'AID-1029-8734', tradeNumber: 'TRD-GST-12', designation: 'Senior Setter', department: 'Stone Setting Department', salaryType: 'Salaried', address: 'Flat 405, Pearl Residency, Jaipur, Rajasthan', zipCode: '302001', bankDetails: 'ICICI Bank - Acc: 001205009812, IFSC: ICIC0000012', activeJobsCount: 1, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: 'USR-03', firstName: 'Amit', lastName: 'Mehta', name: 'Amit Mehta', mobileNumber: '+91 91234 56789', mailId: 'amit.m@luxurygold.com', nationalId: 'AID-4321-0987', tradeNumber: 'TRD-CAD-09', designation: 'Chief Designer', department: 'Design Department', salaryType: 'Salaried', address: '44 Golden Hills, Mumbai, Maharashtra', zipCode: '400001', bankDetails: 'Axis Bank - Acc: 9140100234190, IFSC: UTIB0000004', activeJobsCount: 0, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
  { id: 'USR-04', firstName: 'Preeti', lastName: 'Sharma', name: 'Preeti QC', mobileNumber: '+91 98989 89898', mailId: 'preeti.s@luxurygold.com', nationalId: 'AID-8923-0129', tradeNumber: 'TRD-QC-05', designation: 'Quality Manager', department: 'Quality Check (QC) Department', salaryType: 'Salaried', address: 'Sector 5, Gandhinagar, Gujarat', zipCode: '382010', bankDetails: 'SBI - Acc: 30129845312, IFSC: SBIN0000212', activeJobsCount: 1, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
];

// Initial loss tracking records
const initialLossLogs = [
  { id: 'LOSS-001', date: '2026-05-23', jobCardId: 'JC-2026-001', department: 'Casting Department', craftman: 'Rajesh Karigar', metalType: 'Gold 22K', scrapWeight: 0.45, dustCaptured: 0.12, meltingLoss: 0.10, stoneDamage: 0, netLoss: 0.23, notes: 'Spill during tree pouring' },
  { id: 'LOSS-002', date: '2026-05-22', jobCardId: 'JC-2026-003', department: 'Stone Setting Department', craftman: 'Mansoor Karigar', metalType: 'Gold 18K', scrapWeight: 0.40, dustCaptured: 0.35, meltingLoss: 0.0, stoneDamage: 1.20, netLoss: 1.25, notes: 'Ruby chipped during high pressure bezel setting' },
  { id: 'LOSS-003', date: '2026-05-22', jobCardId: 'JC-2026-004', department: 'Final Polishing Department', craftman: 'Mahesh Kumar', metalType: 'Gold 22K', scrapWeight: 0.88, dustCaptured: 0.65, meltingLoss: 0.0, stoneDamage: 0, netLoss: 0.23, notes: 'Filing shavings logged in dust extractor' }
];

// Initial refinery logs
const initialRefineryLogs = [
  { id: 'REF-001', date: '2026-05-20', collectionPeriod: 'May 1 - May 15', dustCategory: 'Polish Floor Dust & Water Sludge', grossCollectionWeight: 1420.0, simulatedAssay: '1.2%', expectedRecovery: 17.04, actualGoldRecovered: 16.92, recoveredFineWeight: 16.92, refineryLedgerCredit: 1269000, status: 'Completed', notes: 'Processed by Alpha Refinery Partners' },
  { id: 'REF-002', date: '2026-05-23', collectionPeriod: 'Weekly Sweepings', dustCategory: 'Casting Crucible Scrapings', grossCollectionWeight: 340.0, simulatedAssay: '4.5%', expectedRecovery: 15.30, actualGoldRecovered: 15.15, recoveredFineWeight: 15.15, refineryLedgerCredit: 1136250, status: 'In Progress', notes: 'High purity crucible sweeps' }
];

// Initial accounts entries
const initialAccountsLedger = [
  { id: 'TXN-001', date: '2026-05-23', type: 'Credit', book: 'Cashbook', category: 'POS Sale', amount: 512000, account: 'Retail Sales Mumbai', voucherNo: 'VOU-POS-8910', description: 'Bridal necklace cash checkout JC-005' },
  { id: 'TXN-002', date: '2026-05-23', type: 'Debit', book: 'Expense', category: 'Karigar Wages', amount: 45000, account: 'Labour Outstandings', voucherNo: 'VOU-EXP-0112', description: 'Weekly contract wages - Rajesh Karigar' },
  { id: 'TXN-003', date: '2026-05-22', type: 'Debit', book: 'Bankbook', category: 'Consumables Purcahse', amount: 18500, account: 'ICICI Current A/c', voucherNo: 'VOU-BANK-901', description: 'Paid to Royal Casting Powders Ltd for investment plaster' },
  { id: 'TXN-004', date: '2026-05-21', type: 'Credit', book: 'Bankbook', category: 'Advance Deposit', amount: 150000, account: 'HDFC Main A/c', voucherNo: 'VOU-DEP-394', description: 'Manufacturing order deposit - Order ORD-9902' }
];

// Initial Customers / CRM profiles
const initialCustomers = [
  { id: 'CUST-01', name: 'Vikram Singhania', mobile: '+91 99000 88000', mail: 'vikram@singhaniagroup.com', dob: '1984-06-15', anniversary: '2010-11-20', loyaltyPoints: 4850, activeGoldScheme: 'Suvarna Gold 12-Month Plan', schemeInstallmentsPaid: 8, schemeAmount: 50000, purchaseHistory: [
    { orderId: 'ORD-9801', date: '2025-12-15', item: 'Emerald & Gold Ring', price: 185000 },
    { orderId: 'ORD-8712', date: '2024-11-20', item: 'Diamond Choker Set', price: 920000 },
  ], notes: 'High-profile VIP client, prefers 22K antique designs.' },
  { id: 'CUST-02', name: 'Ritu Jhunjhunwala', mobile: '+91 98111 22233', mail: 'ritu.j@gmail.com', dob: '1991-03-24', anniversary: '2015-02-12', loyaltyPoints: 2100, activeGoldScheme: 'Suvarna Gold 12-Month Plan', schemeInstallmentsPaid: 3, schemeAmount: 25000, purchaseHistory: [
    { orderId: 'ORD-9201', date: '2026-02-10', item: 'Classic Solitaire Ring', price: 195000 }
  ], notes: 'Enjoys lightweight rose gold collections.' }
];

// Initial Attendance Logs
const initialAttendanceLogs = [
  { id: 'ATT-001', userId: 'USR-01', userName: 'Rajesh Karigar', date: '2026-05-23', timeIn: '09:02 AM', timeOut: '06:15 PM', locationIn: 'Inside Factory', locationOut: 'Inside Factory', status: 'Present' },
  { id: 'ATT-002', userId: 'USR-02', userName: 'Mansoor Karigar', date: '2026-05-23', timeIn: '09:15 AM', timeOut: '06:30 PM', locationIn: 'Inside Factory', locationOut: 'Inside Factory', status: 'Late' },
  { id: 'ATT-003', userId: 'USR-03', userName: 'Amit Mehta', date: '2026-05-23', timeIn: '10:00 AM', timeOut: '05:00 PM', locationIn: 'Outside Factory - Meeting', locationOut: 'Outside Factory - Meeting', status: 'Half-Day' },
  { id: 'ATT-004', userId: 'USR-04', userName: 'Preeti QC', date: '2026-05-23', timeIn: '08:50 AM', timeOut: null, locationIn: 'Inside Factory', locationOut: null, status: 'Present' }
];

const useErpStore = create((set, get) => ({
  // Active User / Auth
  user: { id: 'USR-00', name: 'Super Admin', identifier: 'admin_gold' },
  role: 'Super Admin',
  branch: 'Mumbai Flagship',
  isLoggedIn: true,
  theme: typeof window !== 'undefined' ? localStorage.getItem('hg-theme') || 'dark' : 'dark',

  // Live Gold/Silver/Diamond Tickers
  goldRate: 7520,      // Per gram 24K Gold in Rs
  silverRate: 85.50,   // Per gram Silver in Rs
  diamondRate: 65000,  // Average Per carat in Rs
  rateDirection: 'up', // 'up' | 'down' | 'flat'

  // Databases
  departments: DEPARTMENTS,
  jobCards: initialJobCards,
  inventory: initialInventory,
  users: initialUsers,
  lossLogs: initialLossLogs,
  refineryLogs: initialRefineryLogs,
  accountsLedger: initialAccountsLedger,
  customers: initialCustomers,
  attendanceLogs: initialAttendanceLogs,
  notifications: [
    { id: 1, title: 'QC Mismatch Alert', desc: 'Job Card JC-2026-003 failed weight verification in Stone Setting.', time: '2 mins ago', type: 'error', read: false },
    { id: 2, title: 'Gold Price Spiked', desc: 'Realtime Gold Rate reached Rs.7,520/g (+1.4%).', time: '10 mins ago', type: 'info', read: false },
    { id: 3, title: 'Refinery Batch Complete', desc: 'Weekly Sweeping Assay processing finished successfully.', time: '2 hrs ago', type: 'success', read: true },
    { id: 4, title: 'New Job Card Registered', desc: 'Auto Job JC-2026-004 created for Design DES-BR-5501.', time: '4 hrs ago', type: 'info', read: true }
  ],

  // Actions
  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      localStorage.setItem('hg-theme', nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
    }
    return { theme: nextTheme };
  }),

  login: (userData, role, branch) => set({
    user: userData,
    role: role,
    branch: branch || 'Mumbai Flagship',
    isLoggedIn: true
  }),

  logout: () => set({
    user: null,
    role: null,
    isLoggedIn: false
  }),

  switchRole: (role) => set({ role }),
  switchBranch: (branch) => set({ branch }),

  // Simulating Metal rates fluctuation
  tickRates: () => {
    const goldDelta = (Math.random() - 0.48) * 15;
    const silverDelta = (Math.random() - 0.48) * 0.4;
    const direction = goldDelta > 0 ? 'up' : 'down';
    
    set((state) => ({
      goldRate: Math.round((state.goldRate + goldDelta) * 100) / 100,
      silverRate: Math.round((state.silverRate + silverDelta) * 100) / 100,
      rateDirection: direction,
    }));
  },

  // Notification management
  markAllNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),

  addNotification: (title, desc, type) => set((state) => ({
    notifications: [
      { id: Date.now(), title, desc, time: 'Just now', type: type || 'info', read: false },
      ...state.notifications
    ]
  })),

  // Department Management Actions
  addDepartment: (dept) => set((state) => ({
    departments: [...state.departments, { id: state.departments.length + 1, activeUsers: 0, ...dept }]
  })),

  editDepartment: (id, updatedFields) => set((state) => ({
    departments: state.departments.map((d) => d.id === id ? { ...d, ...updatedFields } : d)
  })),

  deleteDepartment: (id) => set((state) => ({
    departments: state.departments.filter((d) => d.id !== id)
  })),

  reorderDepartments: (newDepts) => set({ departments: newDepts }),

  // Job Cards Management Actions
  addJobCard: (jc) => {
    const id = `JC-2026-0${get().jobCards.length + 1}`;
    const newJc = {
      id,
      barcode: `BC-${id}`,
      rfid: `RFID-${id}`,
      status: 'Pending',
      currentDept: 'Design Department',
      timeline: [
        { stage: 'Design Department', craftman: get().user?.name || 'Super Admin', date: new Date().toISOString().split('T')[0], status: 'In Progress', loss: 0 }
      ],
      qcStatus: 'Pending',
      reworkCount: 0,
      priority: jc.priority || 'Medium',
      dueDate: jc.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      ...jc
    };
    set((state) => ({
      jobCards: [newJc, ...state.jobCards]
    }));
    get().addNotification('New Job Card Created', `Successfully registered Job Card ${id} for product tracking.`, 'success');
  },

  updateJobCardStatus: (id, status) => set((state) => {
    const updated = state.jobCards.map((jc) => {
      if (jc.id === id) {
        // Log department history if status changes to new department stage
        const lastTimeline = jc.timeline[jc.timeline.length - 1];
        let timeline = [...jc.timeline];
        
        if (status === 'Completed') {
          // Finish current timeline item
          if (lastTimeline) lastTimeline.status = 'Completed';
        } else if (status === 'Rework' || status === 'QC Failed') {
          if (lastTimeline) lastTimeline.status = 'Rework';
        }

        return { ...jc, status, timeline };
      }
      return jc;
    });

    return { jobCards: updated };
  }),

  transferJobCardDept: (id, nextDeptName, craftsmanName, metalLoss) => set((state) => {
    const updated = state.jobCards.map((jc) => {
      if (jc.id === id) {
        // Complete last department timeline entry
        const timeline = [...jc.timeline];
        if (timeline.length > 0) {
          timeline[timeline.length - 1].status = 'Completed';
          timeline[timeline.length - 1].loss = parseFloat(metalLoss) || 0;
        }
        
        // Add new department entry
        timeline.push({
          stage: nextDeptName,
          craftman: craftsmanName,
          date: new Date().toISOString().split('T')[0],
          status: 'In Progress',
          loss: 0
        });

        // Record loss in loss logs if there is metal loss
        if (parseFloat(metalLoss) > 0) {
          const lossId = `LOSS-0${state.lossLogs.length + 1}`;
          const newLossLog = {
            id: lossId,
            date: new Date().toISOString().split('T')[0],
            jobCardId: jc.id,
            department: jc.currentDept,
            craftman: jc.assignedCraftman,
            metalType: jc.grossWeight > 0 ? 'Gold 22K' : 'Gold 18K',
            scrapWeight: parseFloat(metalLoss),
            dustCaptured: Math.round(parseFloat(metalLoss) * 0.7 * 100) / 100,
            meltingLoss: Math.round(parseFloat(metalLoss) * 0.1 * 100) / 100,
            stoneDamage: 0,
            netLoss: Math.round(parseFloat(metalLoss) * 0.2 * 100) / 100,
            notes: `Transferred to ${nextDeptName}`
          };
          
          setTimeout(() => {
            set((s) => ({ lossLogs: [newLossLog, ...s.lossLogs] }));
          }, 0);
        }

        return {
          ...jc,
          currentDept: nextDeptName,
          assignedCraftman: craftsmanName,
          status: 'In Progress',
          timeline
        };
      }
      return jc;
    });
    
    setTimeout(() => {
      get().addNotification('Job Card Transferred', `Job Card ${id} moved to ${nextDeptName} assigned to ${craftsmanName}.`, 'info');
    }, 0);

    return { jobCards: updated };
  }),

  approveJobQC: (id, remarks) => set((state) => {
    const updated = state.jobCards.map((jc) => {
      if (jc.id === id) {
        const timeline = [...jc.timeline];
        if (timeline.length > 0) {
          timeline[timeline.length - 1].status = 'Completed';
        }
        return {
          ...jc,
          status: 'Completed',
          qcStatus: 'Approved',
          notes: remarks ? `${remarks} (QC Approved)` : jc.notes,
          timeline
        };
      }
      return jc;
    });

    setTimeout(() => {
      get().addNotification('QC Approved', `Job Card ${id} successfully passed quality checks.`, 'success');
    }, 0);

    return { jobCards: updated };
  }),

  rejectJobQC: (id, remarks) => set((state) => {
    const updated = state.jobCards.map((jc) => {
      if (jc.id === id) {
        const timeline = [...jc.timeline];
        if (timeline.length > 0) {
          timeline[timeline.length - 1].status = 'Rework';
        }
        return {
          ...jc,
          status: 'Rework',
          qcStatus: 'Failed',
          reworkCount: jc.reworkCount + 1,
          notes: remarks ? `${remarks} (QC Failed - Rework Needed)` : jc.notes,
          timeline
        };
      }
      return jc;
    });

    setTimeout(() => {
      get().addNotification('QC Failed', `Job Card ${id} failed QC and returned for rework.`, 'error');
    }, 0);

    return { jobCards: updated };
  }),

  registerHallmarkHUID: (id, huidCode) => set((state) => {
    const updated = state.jobCards.map((jc) => {
      if (jc.id === id) {
        return {
          ...jc,
          status: 'Hallmarked',
          notes: `${jc.notes || ''} | HUID Registered: ${huidCode}`
        };
      }
      return jc;
    });

    setTimeout(() => {
      get().addNotification('Hallmark Registered', `BIS Hallmark HUID ${huidCode} verified for ${id}.`, 'success');
    }, 0);

    return { jobCards: updated };
  }),

  // Inventory Actions
  addInventoryItem: (item) => set((state) => ({
    inventory: [{ id: `inv_${state.inventory.length + 1}`, status: item.status || 'In Stock', finalPrice: item.grossWeight * get().goldRate + (item.makingCharges || 0), ...item }, ...state.inventory]
  })),

  editInventoryItem: (id, updatedFields) => set((state) => ({
    inventory: state.inventory.map((item) => item.id === id ? { ...item, ...updatedFields } : item)
  })),

  deleteInventoryItem: (id) => set((state) => ({
    inventory: state.inventory.filter((item) => item.id !== id)
  })),

  // User Actions
  addUser: (user) => set((state) => ({
    users: [{ id: `USR-0${state.users.length + 1}`, name: `${user.firstName} ${user.lastName}`, activeJobsCount: 0, ...user }, ...state.users]
  })),

  // Refinery Collection & Recovery Actions
  addRefineryCollection: (record) => set((state) => ({
    refineryLogs: [{ id: `REF-0${state.refineryLogs.length + 1}`, date: new Date().toISOString().split('T')[0], status: 'In Progress', ...record }, ...state.refineryLogs]
  })),

  completeRefineryRecovery: (id, expected, actual, recoveredFineWeight, ledgerCreditVal) => set((state) => {
    // Also post dynamic accounting voucher
    const creditAmount = ledgerCreditVal || Math.round(recoveredFineWeight * get().goldRate);
    const txnId = `TXN-0${state.accountsLedger.length + 1}`;
    const newTxn = {
      id: txnId,
      date: new Date().toISOString().split('T')[0],
      type: 'Credit',
      book: 'Cashbook',
      category: 'Refinery Recovery',
      amount: creditAmount,
      account: 'Fine Metal Asset Account',
      voucherNo: `VOU-REF-${id.split('-')[1] || Date.now()}`,
      description: `Refined scrap recovered ${recoveredFineWeight}g fine gold credit`
    };

    setTimeout(() => {
      set((s) => ({ accountsLedger: [newTxn, ...s.accountsLedger] }));
      get().addNotification('Refinery Credit Generated', `Bookkeeping ledger credited with Rs. ${creditAmount.toLocaleString()} for recovered metal.`, 'success');
    }, 0);

    return {
      refineryLogs: state.refineryLogs.map((log) => log.id === id ? {
        ...log,
        expectedRecovery: parseFloat(expected),
        actualGoldRecovered: parseFloat(actual),
        recoveredFineWeight: parseFloat(recoveredFineWeight),
        refineryLedgerCredit: creditAmount,
        status: 'Completed'
      } : log)
    };
  }),

  // POS Sales Billing Checkout
  checkoutPOSSale: (cartItems, paymentDetails, goldExchangeWeight, goldExchangePurity) => set((state) => {
    const txnId = `TXN-0${state.accountsLedger.length + 1}`;
    const totalCash = paymentDetails.total;
    
    // Add ledger entries
    const newTxn = {
      id: txnId,
      date: new Date().toISOString().split('T')[0],
      type: 'Credit',
      book: 'Cashbook',
      category: 'POS Sale',
      amount: totalCash,
      account: paymentDetails.method === 'Split' ? 'Multiple Books' : 'Bank Main Account',
      voucherNo: `VOU-POS-${Date.now().toString().slice(-4)}`,
      description: `POS Checkout - Items: ${cartItems.map(i => i.name).join(', ')}`
    };

    // If there is a gold exchange, log the fine weight inflow in inventory
    if (goldExchangeWeight > 0) {
      const invId = `inv_${state.inventory.length + 1}`;
      const exchangeFineWeight = goldExchangeWeight * goldExchangePurity;
      const exVal = Math.round(exchangeFineWeight * state.goldRate);
      
      const goldInflowItem = {
        id: invId,
        category: 'Gold',
        name: `Cust Exchange - ${goldExchangePurity * 100}% Scrap Gold`,
        sku: `GLD-EXCH-${Math.round(goldExchangePurity*24)}K`,
        barcode: `BAR-EX-${Date.now().toString().slice(-4)}`,
        rfid: `RFID-EX-${Date.now().toString().slice(-4)}`,
        grossWeight: parseFloat(goldExchangeWeight),
        netWeight: parseFloat(goldExchangeWeight),
        fineWeight: exchangeFineWeight,
        purity: parseFloat(goldExchangePurity),
        karat: Math.round(goldExchangePurity * 24),
        stoneWeight: 0,
        diamondWeight: 0,
        makingCharges: 0,
        wastage: 0,
        finalPrice: exVal,
        image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=200'
      };

      setTimeout(() => {
        set((s) => ({ inventory: [goldInflowItem, ...s.inventory] }));
        get().addNotification('Exchange Metal Logged', `Logged ${goldExchangeWeight}g exchange scrap into Vault.`, 'success');
      }, 0);
    }

    get().addNotification('POS Checkout Complete', `Generated Invoice for Rs. ${totalCash.toLocaleString()}`, 'success');

    return {
      accountsLedger: [newTxn, ...state.accountsLedger]
    };
  }),

  // Add Accounts Ledger Entry
  addTransaction: (txn) => set((state) => ({
    accountsLedger: [{ id: `TXN-0${state.accountsLedger.length + 1}`, ...txn }, ...state.accountsLedger]
  })),

  // Attendance Actions
  markAttendance: (userId, userName, location, type) => set((state) => {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    if (type === 'Punch In') {
      const newLog = {
        id: `ATT-0${state.attendanceLogs.length + 1}`,
        userId,
        userName,
        date: today,
        timeIn: currentTime,
        timeOut: null,
        locationIn: location,
        locationOut: null,
        status: 'Present'
      };
      
      setTimeout(() => {
        get().addNotification('Attendance Marked', `${userName} punched in from ${location}.`, 'success');
      }, 0);

      return { attendanceLogs: [newLog, ...state.attendanceLogs] };
    } else if (type === 'Punch Out') {
      const updatedLogs = state.attendanceLogs.map((log) => {
        if (log.userId === userId && log.date === today && !log.timeOut) {
          return { ...log, timeOut: currentTime, locationOut: location };
        }
        return log;
      });
      
      setTimeout(() => {
        get().addNotification('Attendance Marked', `${userName} punched out from ${location}.`, 'success');
      }, 0);

      return { attendanceLogs: updatedLogs };
    }
    return state;
  }),

  // CRM Scheme Installment payment simulation
  paySchemeInstallment: (customerId) => set((state) => {
    const updated = state.customers.map((cust) => {
      if (cust.id === customerId) {
        const amt = cust.schemeAmount;
        const nextPaid = cust.schemeInstallmentsPaid + 1;
        
        // Post transaction voucher
        const txnId = `TXN-0${state.accountsLedger.length + 1}`;
        const newTxn = {
          id: txnId,
          date: new Date().toISOString().split('T')[0],
          type: 'Credit',
          book: 'Cashbook',
          category: 'Suvarna Scheme Inflow',
          amount: amt,
          account: 'Suvarna Scheme Ledger',
          voucherNo: `VOU-SCH-${Date.now().toString().slice(-4)}`,
          description: `Scheme Installment #${nextPaid} paid by ${cust.name}`
        };

        setTimeout(() => {
          set((s) => ({ accountsLedger: [newTxn, ...s.accountsLedger] }));
        }, 0);

        return {
          ...cust,
          schemeInstallmentsPaid: nextPaid,
          loyaltyPoints: cust.loyaltyPoints + 150
        };
      }
      return cust;
    });

    get().addNotification('Scheme Payment Paid', `Successfully registered Suvarna Scheme Installment. Loyalty balance updated.`, 'success');

    return { customers: updated };
  }),
}));

export default useErpStore;

if (typeof window !== 'undefined') {
  const initialTheme = localStorage.getItem('hg-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', initialTheme);
}
