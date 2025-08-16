
export async function sendWebhook(url: string, data: any) {
	try {
		await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
	} catch (e) {
		console.error('Webhook error:', e);
	}
}
