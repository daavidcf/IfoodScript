const accessToken = ('; '+document.cookie).split('; aAccessToken=').pop().split(';').shift();
let page = 0, total = 0;

while (true) {
	const response = await fetch(`https://marketplace.ifood.com.br/v4/customers/me/orders?page=${page}&size=25`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	const result = await response.json();

	if (result.length === 0) {
		break;
	}

	for (const item of result) {
		if (item.lastStatus === 'CONCLUDED') {
			total += item.payments.total.value;
		}
	}

	page++;
}

let currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

console.log(`O seu total gasto no iFood foi de ${currency.format(total/100)}`);