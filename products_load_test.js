import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import { scenario } from "k6/execution";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

// This SharedArray is used by all of the virtual users.
const data = new SharedArray("data", function () {
  return papaparse.parse(open(`./data/${__ENV.DATASET}`), {
    header: true,
  }).data;
});

const warmupIterations = Math.floor(data.length * 0.1);

export const options = {
  scenarios: {
    use_all_data: {
      executor: "shared-iterations",
      vus: parseInt(__ENV.VUS) || 10,
      iterations: data.length - 1,
      maxDuration: "1h",
    },
  },
};

export default function () {
  const {
    longitude,
    latitude,
    max_distance,
    min_price,
    max_price,
    min_calories,
    max_calories,
  } = data[scenario.iterationInTest];

  let res;
  if (scenario.iterationInTest <= warmupIterations) {
    res = http.get(
      `http://${__ENV.DOMAIN_NAME}/products?longitude=${longitude}&latitude=${latitude}&maxDistance=${max_distance}&minPrice=${min_price}&maxPrice=${max_price}&minCalories=${min_calories}&maxCalories=${max_calories}`,
      {
        tags: { name: "Warmup" },
      }
    );
  } else {
    res = http.get(
      `http://${__ENV.DOMAIN_NAME}/products?longitude=${longitude}&latitude=${latitude}&maxDistance=${max_distance}&minPrice=${min_price}&maxPrice=${max_price}&minCalories=${min_calories}&maxCalories=${max_calories}`,
      {
        tags: { name: "SearchProducts" },
      }
    );
  }
  check(res, { Successful: (res) => res.status == 200 });
  sleep(1);
}
