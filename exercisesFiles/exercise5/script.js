const chooseXML = document.getElementById("chooseFileXML");
const fileXML = document.getElementById("fileXMLInput");
const currentXML = document.getElementById("currentXML");
const fileXMLSubmitButton = document.getElementById("fileXMLSubmit");

const fileSchema = document.getElementById("fileSchemaInput");
const currentSchema = document.getElementById("currentSchema");
const fileSchemaSubmitButton = document.getElementById("fileSchemaSubmit");

const fileDownload = document.getElementById("downloadFile");
const serializerXML = new XMLSerializer();

let submittedXML = "";

var xmlDoc;
var schemaContent = "";
var emptyDisk = null;
var emptyGenre = null;
var emptyStudent = null;

currentXML.textContent = "Wczytany plik: Brak";
currentSchema.textContent = "Wczytany plik: Brak";

fileXMLSubmitButton.onclick = function () {
    console.log("Starting XML file loader.");
    const file = fileXML.files[0];

    if (!file)
        return;

    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = function (evt) {
        let xmlContent = evt.target.result;
        fileDownload.href = makeTextFile(xmlContent);

        let parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlContent, "text/xml");
        currentXML.textContent = "Wczytany plik: " + fileXML.files[0].name;
        onFileLoaded();
    }

    reader.onerror = function (evt) {
        console.log("Error - cannot read file.")
    }

    console.log("XML file loaded!");
}

fileSchemaSubmitButton.onclick = function () {
    console.log("Starting Schema file loader.");
    const file = fileSchema.files[0];

    if (!file)
        return;

    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = function (evt) {
        schemaContent = evt.target.result;
        chooseXML.removeAttribute("hidden");
        currentSchema.textContent = "Wczytany plik: " + fileSchema.files[0].name;
    }

    console.log("Schema file loaded!");
}

// Methods section

function onFileLoaded() {
    // Checks whether there are any disks, genres or students in file.
    if (xmlDoc.getElementsByTagName("disk").length != 0)
        emptyDisk = createEmptyDisk(xmlDoc.getElementsByTagName("disk")[0]);

    updateLastDiskID(emptyDisk);

    const disksDiv = document.getElementById("disks");
    let disksGenerated = document.getElementById("disksGenerated");

    if (disksGenerated != null) {
        disksGenerated.remove();
    }

    disksGenerated = document.createElement("disksGenerated");
    disksGenerated.setAttribute("id", "disksGenerated");

    disksDiv.append(disksGenerated);

    let allGenresIDs = [];
    for (let element of xmlDoc.getElementsByTagName("genre")) {
        allGenresIDs.push(element.getAttribute("genreId"));
    }

    let allStudentsIDs = [];
    for (let element of xmlDoc.getElementsByTagName("student")) {
        allStudentsIDs.push(element.getAttribute("studentId"));
    }

    let allDisks = [];
    for (let element of xmlDoc.getElementsByTagName("disk")) {
        allDisks.push(element);
    }

    for (let element of xmlDoc.getElementsByTagName("disk")) {
        const newRowLabels = document.createElement("tr");
        const newRow = document.createElement("tr");
        let childIndex = 0;

        createLabelColumn(newRowLabels, "ID płyty");
        const diskIDAttr = element.getAttributeNode("id");
        const diskID = createTextInputFromAttribute(diskIDAttr);
        createContentColumn(newRow, diskID);

        createLabelColumn(newRowLabels, "Gatunek");
        const diskGenreIDAttr = element.getAttributeNode("genreId");
        const diskGenreID = createSelectFromAttribute(diskGenreIDAttr, allGenresIDs, diskGenreIDAttr.value);
        createContentColumn(newRow, diskGenreID);

        createLabelColumn(newRowLabels, "Ulubiona");
        const diskStudentIDAttr = element.getAttributeNode("favorite");
        const diskStudentID = createSelectFromAttribute(diskStudentIDAttr, allStudentsIDs, diskStudentIDAttr.value);
        createContentColumn(newRow, diskStudentID);

        createLabelColumn(newRowLabels, "Autor");
        const diskAuthor = createTextInputFromElement(element.children[childIndex]);
        createContentColumn(newRow, diskAuthor);
        childIndex++;

        createLabelColumn(newRowLabels, "Tytuł");
        const diskTitle = createTextInputFromElement(element.children[childIndex]);
        createContentColumn(newRow, diskTitle);
        childIndex++;

        createLabelColumn(newRowLabels, "Data wydania");
        const diskReleased = createTextInputFromElement(element.children[childIndex]);
        createContentColumn(newRow, diskReleased);
        childIndex++;

        createLabelColumn(newRowLabels, "Ilość piosenek");
        const diskSongs = createTextInputFromElement(element.children[childIndex]);
        createContentColumn(newRow, diskSongs);
        childIndex++;

        createLabelColumn(newRowLabels, "Długość");
        const diskLength = createTextInputFromElement(element.children[childIndex]);
        createContentColumn(newRow, diskLength);
        childIndex++;

        createLabelColumn(newRowLabels, "Cena");
        const diskPrice = createTextInputFromElement(element.children[childIndex]);
        createContentColumn(newRow, diskPrice);
        childIndex++;

        createLabelColumn(newRowLabels, "Ocena");
        const diskRating = createTextInputFromElement(element.children[childIndex]);
        createContentColumn(newRow, diskRating);
        childIndex++;

        createLabelColumn(newRowLabels, "Usuń płytę");
        const deleteButton = createDeleteButton([newRow, element], null);
        createContentColumn(newRow, deleteButton);

        disksGenerated.append(newRowLabels);
        disksGenerated.append(newRow);
        disksGenerated.append(document.createElement("br"));
        disksGenerated.append(document.createElement("hr"));
        disksGenerated.append(document.createElement("br"));
    }

    {
        const newRowLabels = document.createElement("tr");
        const newRow = document.createElement("tr");

        createLabelColumn(newRowLabels, "Dodaj płytę");
        const addButton = createAddButton(emptyDisk, xmlDoc.getElementsByTagName("disks")[0], "");
        createContentColumn(newRow, addButton);

        disksGenerated.append(newRowLabels);
        disksGenerated.append(newRow);
        disksGenerated.append(document.createElement("br"));
        disksGenerated.append(document.createElement("hr"));
        disksGenerated.append(document.createElement("br"));
    }

    const genreTable = document.getElementById("genreTable");
    const genreElements = xmlDoc.getElementsByTagName("genre");
    genreTable.removeAttribute("hidden");

    for (let element of genreElements) {
        let genreName = element.textContent;
        let newRow = document.createElement("tr");

        newRow.innerHTML = "<td>" + genreName + "</td>";
        genreTable.appendChild(newRow);
    }

    const studentTable = document.getElementById("studentTable");
    const studentElements = xmlDoc.getElementsByTagName("student");
    studentTable.removeAttribute("hidden");

    for (let element of studentElements) {
        let studentID = element.getAttribute("studentId");
        let studentName = element.textContent;
        let newRow = document.createElement("tr");

        newRow.innerHTML = "<td>" + studentID + "</td>" +
            "<td>" + studentName + "</td>";
        studentTable.appendChild(newRow);
    }
}

function createLabelColumn(labelParent, label) {
    const labelElement = document.createElement("label");
    labelElement.textContent = label;

    let labelTh = document.createElement("th");
    labelTh.appendChild(labelElement);
    labelParent.appendChild(labelTh);
}

function createContentColumn(contentParent, content) {
    let contentTh = document.createElement("th");
    contentTh.append(content);
    contentParent.appendChild(contentTh);
}

function createTextInputFromElement(element) {
    let input = document.createElement("input");
    input.type = "text";
    input.value = element.textContent;

    let oldValue = { str: element.textContent };
    input.onchange = function () {
        validateAndAssignXMLElement(element, input, oldValue);
    };

    return input;
}

function createTextInputFromAttribute(attribute) {
    let input = document.createElement("input");
    input.type = "text";
    input.value = attribute.value;

    let oldValue = { str: attribute.value };
    input.onchange = function () {
        validateAndAssignXMLAttribute(attribute, input, oldValue);
    };

    return input;
}

function createSelectFromAttribute(attribute, optionList, defaultValue) {
    const select = document.createElement("select");

    for (option of optionList) {
        let optionElement = document.createElement("option");
        if (option == defaultValue) {
            optionElement.setAttribute("selected", "");
        }
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    }

    select.onchange = function () {
        attribute.value = select.value;
        onXMLChanged();
    };

    return select;
}

function createDeleteButton(elementToDelete, optionalElementsToDelete) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Usuń ";

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./icons/trash.png";
    deleteIcon.width = 10;
    deleteIcon.height = 10;
    deleteButton.appendChild(deleteIcon);

    deleteButton.onclick = function () {
        elementToDelete.forEach(element => {
            element.remove();
        });

        console.log(optionalElementsToDelete);
        if (optionalElementsToDelete != null) {
            const response = confirm("Czy usunąć też powiązane elementy?");
            if (response) {
                optionalElementsToDelete.forEach(element => {
                    element.remove();
                })
            }
        }

        onXMLChanged();
    }

    return deleteButton;
}

function createAddButton(elementToAdd, xmlParentElement, insertBefore) {
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.textContent = "Dodaj ";

    const plusIcon = document.createElement("img");
    plusIcon.src = "./icons/plus.png";
    plusIcon.width = 10;
    plusIcon.height = 10;
    addButton.appendChild(plusIcon);

    addButton.onclick = function () {
        if (insertBefore == "") {
            xmlParentElement.append(elementToAdd.cloneNode(true));
        }
        else {
            let objectToPutBeforeFound = false;
            for (obj of xmlParentElement.children) {
                if (obj.localName == insertBefore) {
                    objectToPutBeforeFound = true;
                }
                else if (objectToPutBeforeFound) {
                    xmlParentElement.insertBefore(elementToAdd.cloneNode(true), obj);
                    xmlParentElement.insertBefore(xmlDoc.createTextNode(" "), obj);
                    break;
                }
            }
        }

        onXMLChanged();
    }

    return addButton;
}

function createEmptyDisk(disk) {
    let diskClone = disk.cloneNode(true);

    diskClone.getElementsByTagName("author")[0].textContent = "Autor";
    diskClone.getElementsByTagName("title")[0].textContent = "Tytuł";
    diskClone.getElementsByTagName("released")[0].textContent = "00/00/0000";
    diskClone.getElementsByTagName("howManySongs")[0].textContent = "1";
    diskClone.getElementsByTagName("length")[0].textContent = "0:00";
    diskClone.getElementsByTagName("price")[0].textContent = "1.00";
    diskClone.getElementsByTagName("ratings")[0].textContent = "1.0";

    return diskClone;
}

function updateLastDiskID(disk) {
    disk.setAttribute("id", calculateLastID("disk", "id", "D", 2));
    if (xmlDoc.getElementsByTagName("student").length == 0)
        disk.setAttribute("favorite", "");
    else
        disk.setAttribute("favorite", xmlDoc.getElementsByTagName("student")[0].getAttribute("studentId"));
}

function updateLastGenreID(genre) {
    genre.setAttribute("genreId", genre.getElementsByTagName("genre")[0].value);
}

function updateLastStudentID(student) {
    student.setAttribute("studentId", calculateLastID("student", "studentId", "S", 2));
}

function calculateLastID(elementTag, idName, charsBeforeNumbers, numberOfChars) {
    let newIDNumber = 1;
    let idFound = false;
    let newID = "";
    const allElements = xmlDoc.getElementsByTagName(elementTag);

    while(!idFound) {
        let potentialID = charsBeforeNumbers;

        for (let i = 0; i < (numberOfChars - charsBeforeNumbers.length - newIDNumber.toString().length); i++) {
            potentialID += "0";
        }
        potentialID += newIDNumber.toString();

        idFound = true;

        for(let i = 0; i < allElements.length; i++) {
            if (potentialID == allElements[i].getAttribute(idName)) {
                idFound = false;
                break;
            }
        }

        newID = potentialID;
        newIDNumber++;
    }

    return newID;
}

function validateAndAssignXMLElement(XMLElement, input, oldValue) {
    XMLElement.textContent = input.value;

    if (xmllint.validateXML({xml: serializerXML.serializeToString(xmlDoc), schema: schemaContent}).errors) {
        console.log(xmllint.validateXML({xml: serializerXML.serializeToString(xmlDoc), schema: schemaContent}));

        XMLElement.textContent = oldValue.str;
        input.value = oldValue.str;

        return;
    }

    oldValue.str = input.value;
    onXMLChanged();
}

function validateAndAssignXMLAttribute(XMLAttribute, input, oldValue) {
    XMLAttribute.textContent = input.value;

    if (xmllint.validateXML({xml: serializerXML.serializeToString(xmlDoc), schema: schemaContent}).errors) {
        console.log(xmllint.validateXML({xml: serializerXML.serializeToString(xmlDoc), schema: schemaContent}));

        XMLAttribute.textContent = oldValue.str;
        input.value = oldValue.str;

        return;
    }

    oldValue.str = input.value;
    onXMLChanged();
}

function makeTextFile(text) {
    let data = new Blob([text], {type: 'text/xml'});
    return window.URL.createObjectURL(data);
}

function onXMLChanged() {
    let XML = serializerXML.serializeToString(xmlDoc);
    fileDownload.href = makeTextFile(XML);
    onFileLoaded();
}