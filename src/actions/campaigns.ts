import request from '@/services/api-service/apiRequest';

async function getCampaignsData() {
  return request.api('campaigns-data').then((response) => response.data.data);
}

async function getSingleCampaign(id: string) {
  return request
    .setParams({})
    .api(`single-campaign`, { popId: id })
    .then((response) => response.data.data);
}

async function campaignStatusToggle(id: string) {
  return request
    .setParams({})
    .api(`status-toggle`, { popId: id })
    .then((response) => response.data);
}

async function updateCampaignData(id: string, data) {
  return request
    .setBody({ settings: data })
    .api(`update-campaign`, { popId: id, data })
    .then((response) => response.data);
}

async function getProductsData(per_page: number) {
  return request
    .setParams({ per_page })
    .api('products')
    .then((response) => response.data.data);
}

export {
  campaignStatusToggle,
  getCampaignsData,
  getProductsData,
  getSingleCampaign,
  updateCampaignData,
};
