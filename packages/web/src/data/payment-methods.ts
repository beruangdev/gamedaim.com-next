export const methodsEWallet = [
  // {
  //   id: "DANA",
  //   title: "Dana",
  //   description: "Pembayaran menggunakan aplikasi Dana",
  //   image: "/image/Dana.svg",
  //   minamount: 1000,
  //   maxamount: 5000000,
  //   feeflat: 750,
  //   feepercent: 3,
  //   minexpired: 15 * 60000,
  //   maxexpired: 180 * 60000,
  // },
  {
    id: "QRIS",
    title: "QRIS",
    description: "Pembayaran menggunakan aplikasi QRIS",
    image: "/image/qris-ipaymu.svg",
    minamount: 1000,
    maxamount: 5000000,
    feeflat: 750,
    feepercent: 0.7,
    minexpired: 15 * 60000,
    maxexpired: 60 * 60000,
  },
  {
    id: "QRISC",
    title: "QRIS (Customize)",
    description: "Pembayaran menggunakan aplikasi QRIS",
    image: "/image/qris-ipaymu.svg",
    minamount: 1000,
    maxamount: 5000000,
    feeflat: 800,
    feepercent: 0.7,
    minexpired: 60 * 60000,
    maxexpired: 1440 * 60000,
  },
  {
    id: "QRIS2",
    title: "QRIS",
    description: "Pembayaran menggunakan aplikasi QRIS",
    image: "/image/qris-ipaymu.svg",
    minamount: 1000,
    maxamount: 5000000,
    feeflat: 750,
    feepercent: 0.7,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "OVO",
    title: "OVO",
    description: "Pembayaran menggunakan aplikasi OVO",
    image: "/image/OVO.svg",
    minamount: 1000,
    maxamount: 10000000,
    feeflat: null,
    feepercent: 3,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
  // {
  //   id: "LINKAJA",
  //   title: "LinkAja",
  //   description: "Pembayaran menggunakan aplikasi LinkAja",
  //   image: "/image/Linkaja.svg",
  //   minamount: 1000,
  //   maxamount: 5000000,
  //   feeflat: 800,
  //   feepercent: 0.7,
  //   minexpired: 15 * 60000,
  //   maxexpired: 1440 * 60000,
  // },
  {
    id: "SHOPEEPAY",
    title: "ShopeePay",
    description: "Pembayaran menggunakan aplikasi ShopeePay",
    image: "/image/Linkaja.svg",
    minamount: 1000,
    maxamount: 10000000,
    feepercent: 3,
    feeflat: null,
    minexpired: 15 * 60000,
    maxexpired: 60 * 60000,
  },
]

export const methodsVA = [
  {
    id: "MYBVA",
    title: "Maybank Virtual Account",
    description: "Pembayaran menggunakan Maybank Virtual Account",
    image: "/image/maybankva.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "PERMATAVA",
    title: "Permata Virtual Account",
    description: "Pembayaran menggunakan Permata Virtual Account",
    image: "/image/qris-ipaymu.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 60 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "BNIVA",
    title: "BNI Virtual Account",
    description: "Pembayaran menggunakan aplikasi OVO",
    image: "/image/bniva.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "BRIVA",
    title: "BRI Virtual Account",
    description: "Pembayaran menggunakan BRI Virtual Account",
    image: "/image/briva.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 60 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "MANDIRIVA",
    title: "Mandiri Virtual Account",
    description: "Pembayaran menggunakan Mandiri Virtual Account",
    image: "/image/mandiri.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 60 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "BCAVA",
    title: "BCA Virtual Account",
    description: "Pembayaran menggunakan BCA Virtual Account",
    image: "/image/mandiri.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "SMSVA",
    title: "Sinarmas Virtual Account",
    description: "Pembayaran menggunakan Sinarmas Virtual Account",
    image: "/image/sinarmasva.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "MUAMALATVA",
    title: "Muamalat Virtual Account",
    description: "Pembayaran menggunakan Muamalat Virtual Account",
    image: "/image/sinarmasva.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 60 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "CIMBVA",
    title: "CIMB Niaga Virtual Account",
    description: "Pembayaran menggunakan CIMB Niaga Virtual Account",
    image: "/image/cimbva.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "DANAMONVA",
    title: "Danamon Virtual Account",
    description: "Pembayaran menggunakan Danamon Virtual Account",
    image: "/image/danamonva.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "OCVCVA",
    title: "OCBC NISP Virtual Account",
    description: "Pembayaran menggunakan OCBC NISP Virtual Account",
    image: "/image/cimbva.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "BSIVA",
    title: "BSI Virtual Account",
    description: "Pembayaran menggunakan BSI Virtual Account",
    image: "/image/cimbva.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 60 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "BNCVA",
    title: "BNC Virtual Account",
    description: "Pembayaran menggunakan BNC Virtual Account",
    image: "/image/cimbva.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 60 * 60000,
    maxexpired: 1440 * 60000,
  },
  {
    id: "OCBCVA",
    title: "BNC Virtual Account",
    description: "Pembayaran menggunakan BNC Virtual Account",
    image: "/image/cimbva.svg",
    minamount: 10000,
    maxamount: 5000000,
    feepercent: null,
    feeflat: 4250,
    minexpired: 60 * 60000,
    maxexpired: 43200 * 60000,
  },
]

export const methodsMart = [
  {
    id: "ALFAMART",
    title: "Alfamart",
    description: "Pembayaran menggunakan Alfamart",
    image: "/image/alfamart.svg",
    minamount: 10000,
    maxamount: 2500000,
    feeflat: 3500,
    feepercent: null,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "INDOMARET",
    title: "Indomaret",
    description: "Pembayaran menggunakan Indomaret",
    image: "/image/qris-ipaymu.svg",
    minamount: 5000,
    maxamount: 2500000,
    feeflat: 3500,
    feepercent: null,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
  {
    id: "ALFAMIDI",
    title: "Alfamidi",
    description: "Pembayaran menggunakan Alfamidi",
    image: "/image/OVO.svg",
    minamount: 5000,
    maxamount: 2500000,
    feeflat: 3500,
    feepercent: null,
    minexpired: 15 * 60000,
    maxexpired: 43200 * 60000,
  },
]