const carData = [
    {
      vehicle: {
        id: 1,
        vehicleName: "Jaguar XE L P250",
        carImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq0KwZlQ4-g7qL_PUjpk8c_lHuECrGg9QOIA&s",
        ratings: 4.8,
        category: "Sedan",
        pricePerDay: 1800,
        features: {
          seats: 4,
          transmission: "Automatic",
          airConditioning: true,
          doors: 4,
        },
      },
    },
    {
      vehicle: {
        id: 2,
        vehicleName: "Audi R8",
        carImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOKXYjQRxfVN1W_R3qoVO9Vk__zJhF5-a5fA&s", 
        ratings: 4.9,
        category: "Sports",
        pricePerDay: 2100,
        features: {
          seats: 2,
          transmission: "Automatic",
          airConditioning: true,
          doors: 2,
        },
      },
    },
    {
      vehicle: {
        id: 3,
        vehicleName: "BMW M3",
        carImage: "data:image/jpeg;base64,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", 
        ratings: 4.8,
        category: "Sports",
        pricePerDay: 1600,
        features: {
          seats: 4,
          transmission: "Manual",
          airConditioning: true,
          doors: 4,
        },
      },
    },
    {
      vehicle: {
        id: 4,
        vehicleName: "Lamborghini Huracán",
        carImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNySdX1jo9mMTkcbMviIbFx21_MMPLatuGez6_kfdLj66e5AuUxExCoFjs9wCuSB_iIZY&usqp=CAU",
        ratings: 5.0,
        category: "Supercar",
        pricePerDay: 2300,
        features: {
          seats: 2,
          transmission: "Automatic",
          airConditioning: true,
          doors: 2,
        },
      },
    },
  ];
  
  export default carData;
  
  