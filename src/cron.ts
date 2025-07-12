import cron from "node-cron";


const { healthCheckUrl } = require("../config.json");

// 50分ごとにヘルスチェックを実行
export function startHealthCheckCron() {
  cron.schedule("*/50 * * * *", async () => {
    try {
      const now = new Date().toLocaleString('ja-JP');
      console.log(` [${now}] ヘルスチェック実行 (${healthCheckUrl})`);
      const response = await fetch(healthCheckUrl);

      if (response.ok) {
        console.log(`[${now}] ヘルスチェック成功: ${response.status}`);
      } else {
        console.warn(` [${now}] ヘルスチェック失敗: ${response.status}`);
      }
    } catch (error) {
      const now = new Date().toLocaleString('ja-JP');
      console.error(` [${now}] ヘルスチェックエラー:`, error);
    }
  });

  console.log("ヘルスチェックの定期実行を開始しました (50分間隔)");
}