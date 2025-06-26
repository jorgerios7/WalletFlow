export default function ValidateEmptyFields(
    inputValue: Record<string, string>,
    formLabels: Record<string, string>
): string | null {
    let emptyFieldList: string[] = [];

    for (const key of Object.keys(inputValue)) {
        if (inputValue[key].trim() === "") {
            emptyFieldList.push(formLabels[key]);
        }
    }

    if (emptyFieldList.length > 0) {
        const isNotPlural = emptyFieldList.length === 1;
        
        if (isNotPlural) {
            return `O campo ${emptyFieldList[0]} não pode estar vazio.`;
        } else {
            const lastField = emptyFieldList.pop(); 
            const formattedList = emptyFieldList.length > 0 
                ? `${emptyFieldList.join(", ")} e ${lastField}` 
                : lastField; 

            return `Os campos ${formattedList} não podem estar vazios.`;
        }
    }

    return null;
}





