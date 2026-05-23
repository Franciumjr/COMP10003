function descriptionAppear(id) {
    document.getElementById("description").style.opacity = "100%";
    if (id == "environment") {
        document.getElementById("descriptionHead").innerHTML = "Environment"
        document.getElementById("descriptionText").innerHTML = "The cleanliness of the surrounding area.";
    }
    if (id == "accessibility") {
        document.getElementById("descriptionHead").innerHTML = "Accessibility"
        document.getElementById("descriptionText").innerHTML = "The ease of access and use of this microwave.";
    }
    if (id == "functionality") {
        document.getElementById("descriptionHead").innerHTML = "Functionality"
        document.getElementById("descriptionText").innerHTML = "The versatility of the microwave, and how well it heats your food.";
    }
    if (id == "facilities") {
        document.getElementById("descriptionHead").innerHTML = "Facilities"
        document.getElementById("descriptionText").innerHTML = "The amount of additional amenities in the surrounding area.";
    }
}

function descriptionDisappear() {
    document.getElementById("description").style.opacity = "0%";
}

function thanks() {             // function to thank users for their comment
    alert ('Thanks!!')
    userComment.value = ""      // resets the text box after the comment is submitted
}