/* =====================================================================
   Business type presets (English + Hinglish)

   Har customer ko stars ke baad 4 sawaal milte hain:
     1. ctx    : visit ke baare mein (kiske saath / pehli baar / trip type)
     2. items  : kya order kiya / kaunsi service li  (admin se har client ke apne items)
     3. aspects: sabse achha kya laga  (kam stars pe: kya behtar ho sakta hai)
     4. price  : pricing kaisi lagi    (3 star pe: kya behtar ho sakta hai)

   A(): aspect      A(label EN, label Hinglish, phrase EN, phrase Hinglish, improve EN?, improve Hinglish?)
   S(): single-choice option jo poora sentence deta hai
   I(): default item  I(label EN, label Hinglish, phrase EN, phrase Hinglish)
   ===================================================================== */
(function () {
  const A = (le, lh, pe, ph, ne, nh) => ({ l:{en:le, hi:lh}, p:{en:pe, hi:ph}, n:{en:ne||pe, hi:nh||ph} });
  const S = (le, lh, en, hi) => ({ l:{en:le, hi:lh}, say:{en, hi} });
  const I = (le, lh, pe, ph) => ({ l:{en:le, hi:lh}, p:{en:pe, hi:ph} });
  const same = a => ({ good:a, bad:a });

  const CLEAN = A("Cleanliness", "Safai", "the cleanliness", "safai");
  const STAFF = A("Staff", "Staff", "the staff", "staff");

  /* ---------- Sawaal 1: visit context ---------- */
  const WITH = {
    t:{ en:"Who did you visit with?", hi:"Aap kiske saath aaye the?" },
    o:[
      S("Family", "Family",
        { good:["Perfect place to visit with family.", "Came with family and everyone enjoyed it."], bad:["Visited with my family."] },
        { good:["Family ke saath gaye the, sabko bahut pasand aaya.", "Family ke saath aane ke liye perfect jagah hai."], bad:["Family ke saath gaye the."] }),
      S("Friends", "Dost",
        { good:["Great spot to hang out with friends."], bad:["Visited with friends."] },
        { good:["Doston ke saath hangout ke liye badhiya jagah hai."], bad:["Doston ke saath gaye the."] }),
      S("Partner", "Partner",
        { good:["Lovely place for a date."], bad:["Visited with my partner."] },
        { good:["Date ke liye bahut achhi jagah hai."], bad:["Partner ke saath gaye the."] }),
      S("Colleagues", "Office team",
        { good:["Good place for a team outing."], bad:["Visited with colleagues."] },
        { good:["Office team ke saath outing ke liye achhi jagah hai."], bad:["Office team ke saath gaye the."] }),
      S("On my own", "Akele",
        { good:["Nice place to relax, even on your own."], bad:["Visited alone."] },
        { good:["Akele baith ke relax karne ke liye bhi achhi jagah hai."], bad:["Akele gaye the."] })
    ]
  };
  const VISIT = {
    t:{ en:"Have you visited us before?", hi:"Kya aap pehle bhi aa chuke hain?" },
    o:[
      S("First visit", "Pehli baar",
        { good:["It was my first visit and it definitely won't be the last."], bad:["This was my first visit."] },
        { good:["Pehli visit thi, aur yakeenan aakhri nahi hogi."], bad:["Pehli visit thi."] }),
      S("Regular here", "Regular hoon",
        { good:["I've been coming here for a while and they're consistently good."], bad:["I've been coming here for a while."] },
        { good:["Kaafi time se yahan aate hain, quality hamesha achhi rehti hai."], bad:["Kaafi time se yahan aate hain."] }),
      S("A friend recommended", "Dost ne bataya",
        { good:["Came here on a friend's recommendation and I'm glad I did."], bad:["Came here on a friend's recommendation."] },
        { good:["Ek dost ne recommend kiya tha, aur sach mein achha laga."], bad:["Ek dost ne recommend kiya tha."] }),
      S("Found on Google", "Google pe dekha",
        { good:["Found them on Google and they lived up to the reviews."], bad:["Found them on Google."] },
        { good:["Google pe dekh ke aaye the, reviews jaisa hi achha nikla."], bad:["Google pe dekh ke aaye the."] })
    ]
  };
  const TRIP = {
    t:{ en:"What brought you here?", hi:"Aap kis wajah se ruke the?" },
    o:[
      S("Family trip", "Family trip",
        { good:["Stayed here with family and it was comfortable for everyone."], bad:["Stayed here with family."] },
        { good:["Family ke saath ruke the, sabke liye comfortable raha."], bad:["Family ke saath ruke the."] }),
      S("Work", "Kaam se",
        { good:["Stayed here for work and it was very convenient."], bad:["Stayed here on a work trip."] },
        { good:["Kaam ke silsile mein ruke the, bahut convenient raha."], bad:["Work trip pe ruke the."] }),
      S("Couple getaway", "Couple trip",
        { good:["Lovely stay for a couple."], bad:["Stayed here as a couple."] },
        { good:["Couple ke liye bahut achha stay hai."], bad:["Couple trip pe ruke the."] }),
      S("With friends", "Doston ke saath",
        { good:["Great stay with friends."], bad:["Stayed here with friends."] },
        { good:["Doston ke saath stay bahut mazedaar raha."], bad:["Doston ke saath ruke the."] })
    ]
  };
  const MEMBER = {
    t:{ en:"How long have you been a member?", hi:"Aap kab se member hain?" },
    o:[
      S("Just joined", "Abhi join kiya", same(["Joined recently."]), same(["Abhi kuch time pehle join kiya hai."])),
      S("1–6 months", "1–6 mahine", same(["Been a member for a few months now."]), same(["Kuch mahino se member hoon."])),
      S("Over 6 months", "6 mahine se zyada", { good:["Been training here for a long time."], bad:["Been a member for a long time."] }, same(["Kaafi time se yahan aa rahe hain."]))
    ]
  };

  /* ---------- Sawaal 4: price ---------- */
  const PRICE = {
    t:{ en:"How did you find our prices?", hi:"Hamari pricing kaisi lagi?" },
    o:[
      S("Great value", "Paisa vasool",
        { good:["Great value for money.", "Very good value for the quality."], bad:["Prices are fair."] },
        { good:["Ekdum paisa vasool.", "Quality ke hisaab se price bahut sahi hai."], bad:["Price theek hai."] }),
      S("Fair", "Theek hai",
        same(["Prices are reasonable."]),
        { good:["Price bhi reasonable hai."], bad:["Price theek-thaak hai."] }),
      S("A bit high", "Thoda mehenga",
        { good:["A little on the pricier side, but worth it."], bad:["Felt overpriced for what we got."] },
        { good:["Thoda mehenga hai, par worth it hai."], bad:["Jo mila uske hisaab se mehenga laga."] })
    ]
  };

  window.REVIEW_PRICE = PRICE;

  window.REVIEW_PRESETS = {
    res: {
      label:"Restaurant", noun:{en:"restaurant", hi:"restaurant"}, nouns:{en:"restaurants", hi:"restaurants"},
      ctx: WITH,
      items:{ t:{en:"What did you order?", hi:"Aapne kya order kiya?"}, hint:"Dal Makhani, Paneer Tikka, Biryani, Thali",
        say:{ en:["We tried the {list}.", "Ordered the {list}.", "Had the {list}."], hi:["{List} order kiya tha.", "{List} try kiya."] },
        def:[ I("Starters","Starters","starters","starters"), I("Main course","Main course","main course","main course"), I("Thali","Thali","thali","thali"),
              I("Biryani","Biryani","biryani","biryani"), I("Chinese","Chinese","Chinese dishes","Chinese"), I("Desserts","Desserts","desserts","desserts") ] },
      aspects:[
        A("Taste", "Taste", "the taste of the food", "khane ka taste"),
        A("Service", "Service", "the service", "service"),
        A("Ambience", "Mahaul", "the ambience", "mahaul"),
        CLEAN,
        A("Quick serving", "Jaldi serving", "how quickly the food was served", "jaldi serving", "the serving time", "serving ka time"),
        A("Portion size", "Quantity", "the generous portions", "quantity", "the portion size", "quantity")
      ]
    },
    cafe: {
      label:"Cafe", noun:{en:"cafe", hi:"cafe"}, nouns:{en:"cafes", hi:"cafes"},
      ctx: WITH,
      items:{ t:{en:"What did you order?", hi:"Aapne kya order kiya?"}, hint:"Cold Coffee, Cappuccino, Pizza, Brownie",
        say:{ en:["We tried the {list}.", "Ordered the {list}.", "Had the {list}."], hi:["{List} order kiya tha.", "{List} try kiya."] },
        def:[ I("Coffee","Coffee","coffee","coffee"), I("Cold coffee","Cold coffee","cold coffee","cold coffee"), I("Shakes","Shakes","shakes","shakes"),
              I("Sandwich","Sandwich","sandwiches","sandwich"), I("Pizza","Pizza","pizza","pizza"), I("Desserts","Desserts","desserts","desserts") ] },
      aspects:[
        A("Taste", "Taste", "the taste", "taste"),
        A("Vibe", "Vibe", "the vibe", "vibe"),
        A("Service", "Service", "the service", "service"),
        CLEAN,
        A("Seating", "Baithne ki jagah", "the comfortable seating", "baithne ki jagah", "the seating", "baithne ki jagah"),
        A("Music", "Music", "the music", "music")
      ]
    },
    salon: {
      label:"Salon / Parlour", noun:{en:"salon", hi:"salon"}, nouns:{en:"salons", hi:"salons"},
      ctx: VISIT,
      items:{ t:{en:"Which service did you take?", hi:"Aapne kaunsi service li?"}, hint:"Haircut, Facial, Keratin, Bridal Makeup",
        say:{ en:["Came in for {list}.", "Went in for {list}."], hi:["Yahan {list} karwaya.", "{List} karwaya tha."] },
        def:[ I("Haircut","Haircut","a haircut","haircut"), I("Facial","Facial","a facial","facial"), I("Hair colour","Hair colour","hair colouring","hair colour"),
              I("Hair spa","Hair spa","a hair spa","hair spa"), I("Beard","Beard","beard grooming","beard trim"), I("Makeup","Makeup","makeup","makeup") ] },
      aspects:[
        A("Skilled staff", "Expert staff", "the skilled staff", "staff ki expertise", "the staff's skill", "staff ki expertise"),
        A("Hygiene", "Hygiene", "the hygiene", "hygiene"),
        A("Final look", "Result", "the final result", "result"),
        A("Friendly staff", "Achha behaviour", "the friendly behaviour", "staff ka behaviour", "the behaviour", "staff ka behaviour"),
        A("On time", "Time pe", "being on time", "time ki pabandi", "the waiting time", "waiting time"),
        A("Products used", "Products", "the quality of products used", "products ki quality", "the products used", "products ki quality")
      ]
    },
    clinic: {
      label:"Clinic / Doctor", noun:{en:"clinic", hi:"clinic"}, nouns:{en:"clinics", hi:"clinics"},
      ctx: VISIT,
      items:{ t:{en:"What was your visit for?", hi:"Aap kis liye aaye the?"}, hint:"Root Canal, Teeth Cleaning, Braces",
        say:{ en:["Visited for {list}.", "Came in for {list}."], hi:["{List} ke liye aaye the.", "{List} ke liye gaye the."] },
        def:[ I("Consultation","Consultation","a consultation","consultation"), I("Check-up","Check-up","a check-up","check-up"), I("Follow-up","Follow-up","a follow-up","follow-up"),
              I("Treatment","Treatment","treatment","treatment"), I("Tests","Tests","tests","tests") ] },
      aspects:[
        A("Doctor's care", "Doctor", "the doctor's care and attention", "doctor ka dhyan se dekhna", "the doctor's attention", "doctor ka attention"),
        A("Clear advice", "Sahi salaah", "the clear explanation", "sahi salaah", "the explanation", "samjhana"),
        STAFF, CLEAN,
        A("Short wait", "Kam waiting", "the short waiting time", "kam waiting", "the waiting time", "waiting time")
      ]
    },
    gym: {
      label:"Gym / Fitness", noun:{en:"gym", hi:"gym"}, nouns:{en:"gyms", hi:"gyms"},
      ctx: MEMBER,
      items:{ t:{en:"What do you train for?", hi:"Aap kya training karte hain?"}, hint:"Weight Training, Zumba, Yoga, CrossFit",
        say:{ en:["Mostly here for {list}.", "I come here for {list}."], hi:["Yahan mostly {list} karte hain.", "{List} ke liye aate hain."] },
        def:[ I("Weight training","Weight training","weight training","weight training"), I("Cardio","Cardio","cardio","cardio"), I("Zumba","Zumba","zumba","zumba"),
              I("Yoga","Yoga","yoga","yoga"), I("Personal training","Personal training","personal training","personal training") ] },
      aspects:[
        A("Equipment", "Equipment", "the equipment", "equipment"),
        A("Trainers", "Trainers", "the trainers", "trainers"),
        CLEAN,
        A("Vibe", "Vibe", "the vibe", "vibe"),
        A("Timings", "Timings", "the flexible timings", "timings", "the timings", "timings"),
        A("Not crowded", "Bheed kam", "how it never feels too crowded", "kam bheed", "the crowding", "bheed")
      ]
    },
    shop: {
      label:"Shop / Store", noun:{en:"store", hi:"shop"}, nouns:{en:"stores", hi:"shops"},
      ctx: VISIT,
      items:{ t:{en:"What did you buy?", hi:"Aapne kya kharida?"}, hint:"Kaju Katli, Rasgulla, Namkeen, Gift Box",
        say:{ en:["Bought {list} here.", "Picked up {list}."], hi:["Yahan se {list} liya.", "{List} kharida tha."] },
        def:[ I("Daily needs","Rozana ka saamaan","daily essentials","rozana ka saamaan"), I("Gifts","Gifts","gifts","gifts"),
              I("Snacks","Snacks","snacks","snacks"), I("Household items","Ghar ka saamaan","household items","ghar ka saamaan") ] },
      aspects:[
        A("Variety", "Variety", "the variety of products", "saamaan ki variety"),
        A("Quality", "Quality", "the product quality", "quality"),
        A("Helpful staff", "Staff", "the helpful staff", "staff ka behaviour", "the staff behaviour", "staff ka behaviour"),
        A("Quick billing", "Jaldi billing", "the quick billing", "jaldi billing", "the billing speed", "billing"),
        A("Packaging", "Packing", "the neat packaging", "packing", "the packaging", "packing"),
        CLEAN
      ]
    },
    hotel: {
      label:"Hotel / Stay", noun:{en:"hotel", hi:"hotel"}, nouns:{en:"hotels", hi:"hotels"},
      ctx: TRIP,
      items:{ t:{en:"What did you book?", hi:"Aapne kya book kiya tha?"}, hint:"Deluxe Room, Suite, Banquet Hall",
        say:{ en:["Booked the {list}.", "Stayed in the {list}."], hi:["{List} book kiya tha.", "{List} mein ruke the."] },
        def:[ I("Standard room","Standard room","standard room","standard room"), I("Deluxe room","Deluxe room","deluxe room","deluxe room"),
              I("Suite","Suite","suite","suite"), I("Banquet / event","Banquet / event","banquet hall","banquet hall") ] },
      aspects:[
        A("Rooms", "Room", "the rooms", "room"),
        CLEAN, STAFF,
        A("Location", "Location", "the location", "location"),
        A("Food", "Khana", "the food", "khana"),
        A("Check-in", "Check-in", "the smooth check-in", "aasaan check-in", "the check-in process", "check-in")
      ]
    },
    other: {
      label:"Other service", noun:{en:"place", hi:"jagah"}, nouns:{en:"places", hi:"places"},
      ctx: VISIT,
      items:{ t:{en:"Which service did you use?", hi:"Aapne kaunsi service li?"}, hint:"AC Repair, Installation, Servicing",
        say:{ en:["Used them for {list}.", "Came to them for {list}."], hi:["{List} ke liye contact kiya tha.", "{List} karwaya tha."] },
        def:[ I("Consultation","Consultation","a consultation","consultation"), I("Repair","Repair","a repair","repair"),
              I("Installation","Installation","an installation","installation"), I("Servicing","Servicing","servicing","servicing") ] },
      aspects:[
        A("Quality of work", "Kaam ki quality", "the quality of work", "kaam ki quality"),
        A("Professional staff", "Staff", "the professional staff", "staff", "the staff", "staff"),
        A("On-time service", "Time pe kaam", "the timely service", "time pe kaam", "the turnaround time", "time"),
        A("Communication", "Baat-cheet", "the clear communication", "baat-cheet", "the communication", "baat-cheet"),
        A("After-service support", "Baad mein support", "the after-service support", "baad ka support", "the after-service support", "baad ka support")
      ]
    }
  };
})();
