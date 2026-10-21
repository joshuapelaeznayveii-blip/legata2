// =====================================================
// ACCOMMODATION DATA
// =====================================================

const accommodations = {

    double: {

        name: "Double Room",
        capacity: 2,
        price: 2000,
        type: "Room",
        overnight: true

    },


    family: {

        name: "Family Room",
        capacity: 4,
        price: 3500,
        type: "Room",
        overnight: true

    },


    villa: {

        name: "Villa",
        capacity: 8,
        price: 8000,
        type: "Villa",
        overnight: true

    },


    goodfor6: {

        name: "Good for 6",
        capacity: 6,
        price: 500,
        type: "Cottage",
        overnight: false

    },


    goodfor10: {

        name: "Good for 10",
        capacity: 10,
        price: 600,
        type: "Cottage",
        overnight: false

    },


    goodfor15: {

        name: "Good for 15",
        capacity: 15,
        price: 800,
        type: "Cottage",
        overnight: false

    },


    grandcottage: {

        name: "Grand Cottage",
        capacity: 30,
        price: 3000,
        type: "Cottage",
        overnight: false

    },


    tent: {

        name: "Tent with Table & Chair",
        capacity: 6,
        price: 500,
        type: "Day Use",
        overnight: false

    },


    table4: {

        name: "Table for 4",
        capacity: 4,
        price: 300,
        type: "Day Use",
        overnight: false

    },


    table6: {

        name: "Table for 6",
        capacity: 6,
        price: 400,
        type: "Day Use",
        overnight: false

    },


    table8: {

        name: "Table for 8",
        capacity: 8,
        price: 500,
        type: "Day Use",
        overnight: false

    },


    event: {

        name: "Event Pavilion",
        capacity: 100,
        price: 30000,
        type: "Event",
        overnight: false

    }

};


// =====================================================
// PRICING SETTINGS
// =====================================================

const ADULT_ENTRANCE_FEE = 300;

const CHILD_ENTRANCE_FEE = 200;

const ADDITIONAL_GUEST_FEE = 450;


// =====================================================
// GET SELECTED ACCOMMODATION FROM URL
// =====================================================

const params =
    new URLSearchParams(
        window.location.search
    );


const selectedRoom =
    params.get("room");


const selectedType =
    params.get("type");


const selectedKey =
    selectedRoom || selectedType;


const accommodation =
    accommodations[selectedKey];


// =====================================================
// PAGE ELEMENTS
// =====================================================

const accommodationName =
    document.getElementById(
        "selected-accommodation"
    );


const accommodationCapacity =
    document.getElementById(
        "selected-capacity"
    );


const accommodationCapacityLabel =
    document.getElementById(
        "selected-capacity-label"
    );


const accommodationPrice =
    document.getElementById(
        "selected-price"
    );


const accommodationType =
    document.getElementById(
        "selected-type"
    );


const checkoutContainer =
    document.getElementById(
        "checkout-container"
    );


const checkOutInput =
    document.getElementById(
        "check-out"
    );


const guestFeeNote =
    document.getElementById(
        "guest-fee-note"
    );


// =====================================================
// DISPLAY SELECTED ACCOMMODATION
// =====================================================

if (accommodation) {

    accommodationName.textContent =
        accommodation.name;


    accommodationCapacity.textContent =
        `${accommodation.capacity} Guests`;


    accommodationPrice.textContent =
        formatPrice(
            accommodation.price
        );


    accommodationType.textContent =
        accommodation.type;


    // -------------------------------------------------
    // CAPACITY LABEL
    // -------------------------------------------------

    if (
        accommodation.type === "Cottage" ||
        accommodation.type === "Day Use"
    ) {

        accommodationCapacityLabel.textContent =
            "Suggested Capacity";

    } else {

        accommodationCapacityLabel.textContent =
            "Capacity";

    }


    // -------------------------------------------------
    // CHECK-OUT LOGIC
    // -------------------------------------------------

    if (accommodation.overnight) {

        checkoutContainer
            .classList
            .remove("hidden");


        checkOutInput.required =
            true;

    } else {

        checkoutContainer
            .classList
            .add("hidden");


        checkOutInput.required =
            false;


        checkOutInput.value =
            "";

    }


    // -------------------------------------------------
    // DYNAMIC NOTE
    // -------------------------------------------------

    updateGuestFeeNote();

} else {

    accommodationName.textContent =
        "No Accommodation Selected";


    accommodationCapacity.textContent =
        "--";


    accommodationPrice.textContent =
        "₱0";


    accommodationType.textContent =
        "--";


    guestFeeNote.innerHTML = `
        <p>
            Please return to the booking page
            and select an accommodation.
        </p>
    `;

}


// =====================================================
// MOBILE MENU
// =====================================================

const menuBtn =
    document.getElementById(
        "menu-btn"
    );


const mobileMenu =
    document.getElementById(
        "mobile-menu"
    );


menuBtn.addEventListener(
    "click",
    function () {

        if (
            mobileMenu.classList.contains(
                "max-h-0"
            )
        ) {

            mobileMenu
                .classList
                .remove(
                    "max-h-0",
                    "opacity-0"
                );


            mobileMenu
                .classList
                .add(
                    "max-h-screen",
                    "opacity-100"
                );

        } else {

            mobileMenu
                .classList
                .remove(
                    "max-h-screen",
                    "opacity-100"
                );


            mobileMenu
                .classList
                .add(
                    "max-h-0",
                    "opacity-0"
                );

        }

    }
);


// =====================================================
// RESERVATION PHASE ELEMENTS
// =====================================================

const reservationForm =
    document.getElementById( 
        "reservation-form"
    );

// =====================================================
// AUTO-SAVE RESERVATION FORM DRAFT
// =====================================================

const reservationDraftKey =
    `reservationDraft_${selectedKey}`;


// Save the current form values
function saveReservationDraft() {

    const draft = {

        firstName:
            document.getElementById("first-name").value,

        middleName:
            document.getElementById("middle-name").value,

        lastName:
            document.getElementById("last-name").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        checkIn:
            document.getElementById("check-in").value,

        checkOut:
            document.getElementById("check-out").value,

        adults:
            document.getElementById("adults").value,

        children:
            document.getElementById("children").value

    };


    localStorage.setItem(
        reservationDraftKey,
        JSON.stringify(draft)
    );
}


// Restore saved form values
function restoreReservationDraft() {

    const savedDraft =
        localStorage.getItem(
            reservationDraftKey
        );


    if (!savedDraft) {
        return;
    }


    const draft =
        JSON.parse(savedDraft);


    document.getElementById("first-name").value =
        draft.firstName || "";


    document.getElementById("middle-name").value =
        draft.middleName || "";


    document.getElementById("last-name").value =
        draft.lastName || "";


    document.getElementById("email").value =
        draft.email || "";


    document.getElementById("phone").value =
        draft.phone || "";


    document.getElementById("check-in").value =
        draft.checkIn || "";


    document.getElementById("check-out").value =
        draft.checkOut || "";


    document.getElementById("adults").value =
        draft.adults || "";


    document.getElementById("children").value =
        draft.children || "0";

}



// =====================================================
// SAVE FORM AUTOMATICALLY WHILE TYPING
// =====================================================

const formInputs =
    reservationForm.querySelectorAll(
        "input"
    );


formInputs.forEach(function (input) {

    input.addEventListener(
        "input",
        saveReservationDraft
    );

    input.addEventListener(
        "change",
        saveReservationDraft
    );

});

restoreReservationDraft();





const formPhase =
    document.getElementById(
        "form-phase"
    );


const reviewPhase =
    document.getElementById(
        "review-phase"
    );


const backToForm =
    document.getElementById(
        "back-to-form"
    );


const confirmInformation =
    document.getElementById(
        "confirm-information"
    );


// =====================================================
// PRICE FORMAT
// =====================================================

function formatPrice(amount) {

    return new Intl.NumberFormat(
        "en-PH",
        {

            style: "currency",

            currency: "PHP",

            maximumFractionDigits: 0

        }
    ).format(amount);

}


// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(dateValue) {

    if (!dateValue) {

        return "--";

    }


    const date =
        new Date(
            dateValue + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-US",
        {

            month: "long",

            day: "numeric",

            year: "numeric"

        }
    );

}


// =====================================================
// UPDATE DYNAMIC NOTE
// =====================================================

function updateGuestFeeNote() {

    if (!accommodation) {

        return;

    }


    // -------------------------------------------------
    // ROOM AND VILLA
    // -------------------------------------------------

    if (
        accommodation.type === "Room" ||
        accommodation.type === "Villa"
    ) {

        guestFeeNote.innerHTML = `

            <p>

                <strong>
                    Additional Guest Fee:
                </strong>

                The reservation price includes up to

                <strong>
                    ${accommodation.capacity} guests.
                </strong>

                Each guest above the capacity will be charged

                <strong>
                    ₱450 per person
                </strong>

                regardless of whether the guest is an adult or child.

            </p>

        `;

    }


    // -------------------------------------------------
    // COTTAGE / TABLE / TENT
    // -------------------------------------------------

    else if (

        accommodation.type === "Cottage" ||

        accommodation.type === "Day Use"

    ) {

        guestFeeNote.innerHTML = `

            <p>

                <strong>
                    Entrance Fees:
                </strong>

                Adult:

                <strong>
                    ₱300 per person
                </strong>

                &nbsp; | &nbsp;

                Child:

                <strong>
                    ₱200 per person
                </strong>

            </p>

            <p class="mt-1">

                The displayed capacity is for reference only.
                The total reservation amount is calculated using
                the reservation price plus the entrance fees
                for all guests.

            </p>

        `;

    }


    // -------------------------------------------------
    // EVENT PAVILION
    // -------------------------------------------------

    else if (
        accommodation.type === "Event"
    ) {

        guestFeeNote.innerHTML = `

            <p>

                <strong>
                    Additional Guest Fee:
                </strong>

                The Event Pavilion reservation price covers up to

                <strong>
                    ${accommodation.capacity} guests.
                </strong>

                Each guest above the capacity will be charged

                <strong>
                    ₱450 per person.
                </strong>

            </p>

        `;

    }

}


// =====================================================
// FORM SUBMISSION
// =====================================================

reservationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // -------------------------------------------------
        // NO ACCOMMODATION
        // -------------------------------------------------

        if (!accommodation) {

            alert(
                "Please select an accommodation first."
            );

            return;

        }


        // -------------------------------------------------
        // REQUIRED FIELD VALIDATION
        // -------------------------------------------------

        if (
            !reservationForm.checkValidity()
        ) {

            reservationForm.reportValidity();

            return;

        }


        // -------------------------------------------------
        // GET FORM VALUES
        // -------------------------------------------------

        const firstName =
            document
                .getElementById(
                    "first-name"
                )
                .value
                .trim();


        const middleName =
            document
                .getElementById(
                    "middle-name"
                )
                .value
                .trim();


        const lastName =
            document
                .getElementById(
                    "last-name"
                )
                .value
                .trim();


        const email =
            document
                .getElementById(
                    "email"
                )
                .value
                .trim();


        const phone =
            document
                .getElementById(
                    "phone"
                )
                .value
                .trim();


        const checkIn =
            document
                .getElementById(
                    "check-in"
                )
                .value;


        const checkOut =
            document
                .getElementById(
                    "check-out"
                )
                .value;


        const adults =
            Number(
                document
                    .getElementById(
                        "adults"
                    )
                    .value
            );


        const children =
            Number(
                document
                    .getElementById(
                        "children"
                    )
                    .value
            );


        // -------------------------------------------------
        // VALIDATE GUEST NUMBERS
        // -------------------------------------------------

        if (adults < 1) {

            alert(
                "There must be at least 1 adult."
            );

            return;

        }


        if (children < 0) {

            alert(
                "Children cannot be a negative number."
            );

            return;

        }


        // -------------------------------------------------
        // VALIDATE CHECK-OUT
        // -------------------------------------------------

        if (
            accommodation.overnight &&
            checkOut <= checkIn
        ) {

            alert(
                "Check-out date must be after the check-in date."
            );

            return;

        }


        // =================================================
        // TOTAL GUESTS
        // =================================================

        const totalGuests =
            adults + children;


        // =================================================
        // BASE PRICE
        // =================================================

        const basePrice =
            accommodation.price;


        // =================================================
        // START WITH ZERO FEES
        // =================================================

        let adultEntranceFee = 0;

        let childEntranceFee = 0;

        let extraGuests = 0;

        let additionalGuestFee = 0;


        // =================================================
        // ROOM / VILLA
        //
        // BASE PRICE INCLUDES CAPACITY
        //
        // ONLY GUESTS ABOVE CAPACITY
        // PAY ₱450 EACH
        // =================================================

        if (

            accommodation.type === "Room" ||

            accommodation.type === "Villa"

        ) {

            extraGuests =
                Math.max(

                    0,

                    totalGuests -
                    accommodation.capacity

                );


            additionalGuestFee =
                extraGuests *
                ADDITIONAL_GUEST_FEE;

        }


        // =================================================
        // COTTAGE / TABLE / TENT
        //
        // CAPACITY IS INFORMATION ONLY
        //
        // BASE PRICE
        // +
        // ADULT ENTRANCE FEES
        // +
        // CHILD ENTRANCE FEES
        // =================================================

        else if (

            accommodation.type === "Cottage" ||

            accommodation.type === "Day Use"

        ) {

            adultEntranceFee =
                adults *
                ADULT_ENTRANCE_FEE;


            childEntranceFee =
                children *
                CHILD_ENTRANCE_FEE;

        }


        // =================================================
        // EVENT PAVILION
        //
        // NO ENTRANCE FEE
        //
        // ₱450 FOR EVERY GUEST
        // ABOVE 100 CAPACITY
        // =================================================

        else if (
            accommodation.type === "Event"
        ) {

            extraGuests =
                Math.max(

                    0,

                    totalGuests -
                    accommodation.capacity

                );


            additionalGuestFee =
                extraGuests *
                ADDITIONAL_GUEST_FEE;

        }


        // =================================================
        // FINAL TOTAL
        // =================================================

        const totalPrice =

            basePrice +

            adultEntranceFee +

            childEntranceFee +

            additionalGuestFee;


        // =================================================
        // FULL NAME
        // =================================================

        let fullName;


        if (middleName) {

            fullName =

                `${firstName} ${middleName} ${lastName}`;

        } else {

            fullName =

                `${firstName} ${lastName}`;

        }


        // =================================================
        // REVIEW - GUEST INFORMATION
        // =================================================

        document
            .getElementById(
                "review-name"
            )
            .textContent =
            fullName;


        document
            .getElementById(
                "review-email"
            )
            .textContent =
            email;


        document
            .getElementById(
                "review-phone"
            )
            .textContent =
            phone;


        // =================================================
        // REVIEW - RESERVATION DETAILS
        // =================================================

        document
            .getElementById(
                "review-accommodation"
            )
            .textContent =
            accommodation.name;


        document
            .getElementById(
                "review-type"
            )
            .textContent =
            accommodation.type;


        document
            .getElementById(
                "review-checkin"
            )
            .textContent =
            formatDate(checkIn);


        document
            .getElementById(
                "review-adults"
            )
            .textContent =
            adults;


        document
            .getElementById(
                "review-children"
            )
            .textContent =
            children;


        // =================================================
        // REVIEW CHECK-OUT
        // =================================================

        const reviewCheckoutContainer =
            document.getElementById(
                "review-checkout-container"
            );


        if (
            accommodation.overnight &&
            checkOut
        ) {

            document
                .getElementById(
                    "review-checkout"
                )
                .textContent =
                formatDate(checkOut);


            reviewCheckoutContainer
                .classList
                .remove("hidden");

        } else {

            reviewCheckoutContainer
                .classList
                .add("hidden");

        }


        // =================================================
        // PRICE SUMMARY
        // =================================================

        document
            .getElementById(
                "review-base-price"
            )
            .textContent =
            formatPrice(basePrice);


        document
            .getElementById(
                "review-adult-fee"
            )
            .textContent =
            formatPrice(
                adultEntranceFee
            );


        document
            .getElementById(
                "review-child-fee"
            )
            .textContent =
            formatPrice(
                childEntranceFee
            );


        document
            .getElementById(
                "review-additional-fee"
            )
            .textContent =
            formatPrice(
                additionalGuestFee
            );


        document
            .getElementById(
                "review-total"
            )
            .textContent =
            formatPrice(
                totalPrice
            );


        // =================================================
        // SHOW / HIDE ENTRANCE FEE ROWS
        // =================================================

        const adultFeeRow =
            document.getElementById(
                "adult-fee-row"
            );


        const childFeeRow =
            document.getElementById(
                "child-fee-row"
            );


        if (
            adultEntranceFee > 0 ||
            childEntranceFee > 0
        ) {

            adultFeeRow
                .classList
                .remove("hidden");


            childFeeRow
                .classList
                .remove("hidden");

        } else {

            adultFeeRow
                .classList
                .add("hidden");


            childFeeRow
                .classList
                .add("hidden");

        }


        // =================================================
        // SHOW / HIDE ADDITIONAL GUEST ROW
        // =================================================

        const additionalGuestRow =
            document.getElementById(
                "additional-guest-row"
            );


        if (
            additionalGuestFee > 0
        ) {

            additionalGuestRow
                .classList
                .remove("hidden");

        } else {

            additionalGuestRow
                .classList
                .add("hidden");

        }


        // =================================================
        // SAVE RESERVATION DATA
        // =================================================

        const reservationData = {

            firstName,

            middleName,

            lastName,

            fullName,

            email,

            phone,

            accommodation:
                accommodation.name,

            type:
                accommodation.type,

            capacity:
                accommodation.capacity,

            checkIn,

            checkOut,

            adults,

            children,

            totalGuests,

            basePrice,

            adultEntranceFee,

            childEntranceFee,

            extraGuests,

            additionalGuestFee,

            totalPrice

        };


        localStorage.setItem(

            "reservationData",

            JSON.stringify(
                reservationData
            )

        );


        // =================================================
        // CHANGE TO REVIEW PHASE
        // =================================================

        formPhase
            .classList
            .add("hidden");


        reviewPhase
            .classList
            .remove("hidden");


        window.scrollTo({

            top:
                reviewPhase.offsetTop - 100,

            behavior:
                "smooth"

        });

    }
);


// =====================================================
// GO BACK AND EDIT
// =====================================================

backToForm.addEventListener(
    "click",
    function () {

        reviewPhase
            .classList
            .add("hidden");


        formPhase
            .classList
            .remove("hidden");


        window.scrollTo({

            top:
                formPhase.offsetTop - 100,

            behavior:
                "smooth"

        });

    }
);


// =====================================================
// CONFIRM INFORMATION
// =====================================================

confirmInformation.addEventListener(
    "click",
    function () {

        const reservationData =

            JSON.parse(

                localStorage.getItem(
                    "reservationData"
                )

            );


        if (!reservationData) {

            alert(
                "Reservation information could not be found."
            );

            return;

        }



        alert(
            "Your information has been confirmed. The next reservation phase will be added here."
        );

    }
);