/* =====================================================================
   Business type presets.
   aspects: [button label, positive phrase, (optional) improve phrase]
   extra:   ek optional sawaal jo har mood mein dikhta hai
   ===================================================================== */
(function () {
  const WITH = {
    t: "Kiske saath aaye the?", type: "single",
    o: [
      ["Family",      { good: ["Perfect place to visit with family.", "Came with family and everyone enjoyed it."], bad: ["Visited with my family."] }],
      ["Friends",     { good: ["Great spot to hang out with friends."], bad: ["Visited with friends."] }],
      ["Partner",     { good: ["Lovely place for a date."], bad: ["Visited with my partner."] }],
      ["Office team", { good: ["Good place for a team outing."], bad: ["Visited with my office team."] }],
      ["Akele",       { good: ["Nice place to relax, even on your own."], bad: ["Visited alone."] }]
    ]
  };

  window.REVIEW_PRESETS = {
    res: {
      label: "Restaurant", noun: "restaurant", nouns: "restaurants", extra: WITH,
      aspects: [
        ["Taste", "the taste of the food"], ["Service", "the service"], ["Ambience", "the ambience"],
        ["Safai", "the cleanliness"], ["Price", "the value for money", "the pricing"],
        ["Fast serving", "how quickly the food was served", "the serving time"]
      ]
    },
    cafe: {
      label: "Cafe", noun: "cafe", nouns: "cafes", extra: WITH,
      aspects: [
        ["Coffee", "the coffee"], ["Food", "the food"], ["Vibe", "the vibe"], ["Service", "the service"],
        ["Safai", "the cleanliness"], ["Price", "the value for money", "the pricing"]
      ]
    },
    salon: {
      label: "Salon / Parlour", noun: "salon", nouns: "salons",
      extra: {
        t: "Kaunsi service li?", type: "multi", say: ["Got {list} done here.", "Went in for {list}."],
        o: [["Haircut", "a haircut"], ["Facial", "a facial"], ["Hair colour", "hair colouring"], ["Hair spa", "a hair spa"],
            ["Beard", "beard grooming"], ["Makeup", "makeup"], ["Mani-Pedi", "a mani-pedi"]]
      },
      aspects: [
        ["Skilled staff", "the skilled staff", "the staff's skill"], ["Hygiene", "the hygiene"], ["Result", "the final result"],
        ["Friendly", "the friendly behaviour", "the behaviour"], ["On time", "being on time", "the waiting time"],
        ["Price", "the value for money", "the pricing"]
      ]
    },
    clinic: {
      label: "Clinic / Doctor", noun: "clinic", nouns: "clinics",
      aspects: [
        ["Doctor", "the doctor's care and attention"], ["Ilaaj", "the treatment"], ["Staff", "the staff"],
        ["Safai", "the cleanliness"], ["Kam waiting", "the short waiting time", "the waiting time"],
        ["Fees", "the reasonable fees", "the fees"]
      ]
    },
    gym: {
      label: "Gym / Fitness", noun: "gym", nouns: "gyms",
      extra: {
        t: "Kab se aa rahe ho?", type: "single",
        o: [
          ["Naya member", { good: ["Joined recently."], bad: ["Joined recently."] }],
          ["1-6 mahine", { good: ["Been a member for a few months now."], bad: ["Been a member for a few months."] }],
          ["6+ mahine", { good: ["Been training here for a long time."], bad: ["Been a member for a long time."] }]
        ]
      },
      aspects: [
        ["Equipment", "the equipment"], ["Trainers", "the trainers"], ["Safai", "the cleanliness"],
        ["Vibe", "the vibe"], ["Timings", "the flexible timings", "the timings"], ["Fees", "the value for money", "the fees"]
      ]
    },
    shop: {
      label: "Shop / Store", noun: "store", nouns: "stores",
      aspects: [
        ["Variety", "the variety of products"], ["Quality", "the product quality"], ["Price", "the prices"],
        ["Staff", "the helpful staff", "the staff behaviour"], ["Fast billing", "the quick billing", "the billing speed"]
      ]
    },
    hotel: {
      label: "Hotel / Stay", noun: "hotel", nouns: "hotels",
      extra: {
        t: "Kis type ki trip thi?", type: "single",
        o: [
          ["Family", { good: ["Stayed here with family and it was comfortable for everyone."], bad: ["Stayed here with family."] }],
          ["Business", { good: ["Stayed here for work and it was very convenient."], bad: ["Stayed here on a work trip."] }],
          ["Couple", { good: ["Lovely stay for a couple."], bad: ["Stayed here as a couple."] }],
          ["Friends", { good: ["Great stay with friends."], bad: ["Stayed here with friends."] }]
        ]
      },
      aspects: [
        ["Room", "the rooms"], ["Safai", "the cleanliness"], ["Staff", "the staff"], ["Location", "the location"],
        ["Food", "the food"], ["Value", "the value for money", "the pricing"]
      ]
    },
    other: {
      label: "Other service", noun: "place", nouns: "places",
      aspects: [
        ["Quality", "the quality of work"], ["Staff", "the professional staff", "the staff"],
        ["Time pe kaam", "the timely service", "the turnaround time"], ["Price", "the fair pricing", "the pricing"],
        ["Communication", "the clear communication", "the communication"]
      ]
    }
  };
})();
