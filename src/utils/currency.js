// // export const detectCurrency = () => {
// //   if (localStorage.getItem("currency")) return;

// //   const locale = navigator.language || "en-US";

// //   const currency = locale.includes("en-IN") ? "INR" : "USD";
// //   localStorage.setItem("currency", currency);
// // };
// export function detectCurrency() {
//   const locale = navigator.language || 'en-US';

//   if (locale.startsWith('en-IN') || locale.startsWith('hi-IN')) {
//     return 'INR';
//   }
//   if (locale.startsWith('en-GB')) {
//     return 'GBP';
//   }
//   if (locale.startsWith('es')) {
//     return 'EUR';
//   }

//   return 'USD';
// }

// export const getCurrency = () => {
//   return localStorage.getItem("currency") || "USD";
// };

// export const formatCurrency = (amount) => {
//   const currency = getCurrency();

//   return new Intl.NumberFormat(
//     currency === "INR" ? "en-IN" : "en-US",
//     {
//       style: "currency",
//       currency,
//       minimumFractionDigits: currency === "INR" ? 0 : 2,
//     }
//   ).format(amount || 0);
// };




export const getCurrencySymbol = (country) => {
  if (!country) return "$";

  const c = country.toLowerCase();

  if (c === "india" || c === "in") return "₹";
  if (c === "usa" || c === "us" || c === "united states") return "$";

  return "$"; // default
};
