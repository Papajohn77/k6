# Radius Query Performance Benchmarking Load Testing Scripts

The purpose of this repository is to provide the k6 scripts used to perform the load testing.

The deciding factor for using k6 is its adoption of a "tests as code" approach. With load tests expressed as code, we can easily version control and share them, replicating scenarios accurately across environments. k6's code-based scripting, developer-friendly experience, and resource efficiency make it an ideal choice. By combining these factors, k6 provides us with a reliable, efficient, and easily reproducible load testing solution.

We use a different load testing dataset for each endpoint and virtual user quantity combination. The datasets are used as parameters in the requests. By using different parameters for each request we prevent server-side caching.

### Getting Started

- #### Clone Repository

  `git clone https://github.com/Radius-Query-Performance-Benchmarking/k6.git`

- #### Change Directory

  `cd ./k6`

- #### Download Load Testing Datasets

  `curl -o data.zip "https://zenodo.org/record/8081573/files/data.zip?download=1"`

- #### Unzip data.zip

  `unzip data.zip && rm data.zip`

- #### Load Test /stores Endpoint (change <benchmark_env_ipv4>, <virtual_users_num> with either 50, 100 or 200 & \<size\> with either 50k, 100k or full)

  `k6 run -e VUS=<virtual_users_num> -e DOMAIN_NAME=<benchmark_env_ipv4> -e DATASET=search_stores_params_<size>_<virtual_users_num>vu.csv stores_load_test.js`

- #### Load Test /products Endpoint (change <benchmark_env_ipv4>, <virtual_users_num> with either 50, 100 or 200 & \<size\> with either 50k, 100k or full)

  `k6 run -e VUS=<virtual_users_num> -e DOMAIN_NAME=<benchmark_env_ipv4> -e DATASET=search_products_params_<size>_<virtual_users_num>vu.csv products_load_test.js`

## Author

- Ioannis Papadatos (t8190314@aueb.gr)
