export default function FinanceData() {
    function getDate(day: number, month: number, year: number) {
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    }

    const recurringItems = [];

    // Grupo 1: 12 parcelas - Mensalidade
    for (let i = 0; i < 30; i++) {
        const date = getDate(1 + i, 1 + i, 2025);
        recurringItems.push({
            id: `${i + 1}`,
            category: 'Salário Mensal',
            dueDate: date,
            packageID: 'pkgR1',
            startDate: '01/01/2025',
            isPaid: 0,
            type: 2,
            value: 3450.0,
            description: `Parcela mensal de Mensalidade - ${date}`,
            method: 'Cartão de Crédito',
            isRecurrence: false
        });
    }

    // Grupo 2: 6 parcelas - Transporte
    for (let i = 0; i < 30; i++) {
        const date = getDate(1 + i, 3 + i, 2025);
        recurringItems.push({
            id: `${12 + i + 1}`,
            category: 'Transporte',
            dueDate: date,
            packageID: 'pkgR2',
            startDate: '01/03/2025',
            isPaid: 1,
            type: 3,
            value: 180.0,
            description: `Parcela de Transporte escolar - ${date}`,
            method: 'Débito automático',
            isRecurrence: true
        });
    }

    // Grupo 3: 9 parcelas - Atividade Extra
    for (let i = 0; i < 10; i++) {
        const date = getDate(1 + i, 4 + i, 2025);
        recurringItems.push({
            id: `${18 + i + 1}`,
            category: 'Atividade Extra',
            dueDate: date,
            packageID: 'pkgR3',
            startDate: '01/04/2025',
            isPaid: 0,
            type: 3,
            value: 90.0,
            description: `Parcela de Atividade Extra - ${date}`,
            method: 'Pix',
            isRecurrence: true
        });
    }

    const baseId = 28;
    const randomItems = [];

    const categories = [
        { category: 'Uniforme', method: 'Boleto bancário', valueRange: [100, 200] },
        { category: 'Material', method: 'Dinheiro', valueRange: [50, 120] },
        { category: 'Mensalidade', method: 'Cartão de crédito', valueRange: [300, 500] },
        { category: 'Transporte', method: 'Débito automático', valueRange: [150, 250] },
        { category: 'Atividade Extra', method: 'Pix', valueRange: [60, 110] }
    ];

    function randomDate(): string {
        const day = Math.floor(Math.random() * 30) + 1;
        const month = Math.floor(Math.random() * 12) + 1;
        const year = 2025;
        return getDate(day, month, year);
    }

    function randomBool() {
        return Math.random() < 0.5;
    }

    function randomValue(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < 10; i++) {
        const id = baseId + i;
        const cat = categories[i % categories.length];
        const dueDate = randomDate();

        randomItems.push({
            id: `${id}`,
            category: cat.category,
            dueDate,
            packageID: `pkg${id}`,
            startDate: dueDate,
            isPaid: 1,
            type: 1,
            value: randomValue(cat.valueRange[0], cat.valueRange[1]),
            description: `Pagamento referente a ${cat.category.toLowerCase()} - ${dueDate}`,
            method: cat.method,
            isRecurrence: false
        });
    }

    return [...recurringItems, ...randomItems];
}
