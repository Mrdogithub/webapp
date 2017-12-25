<template>
    <div>
			<Button type="primary" size="large" class="largeBtn" @click.native="nativeLink('0')">Go to dashboard </Button>
			<Button type="primary" size="large" class="largeBtn" @click.native="nativeLink('1')">Go to chooseVehicle </Button>
			<Button type="primary" size="large" class="largeBtn" @click.native="nativeLink('2')">Go to guide </Button>
			<Button type="primary" size="large" class="largeBtn" @click.native="nativeLink('3')">Save to reminder</Button>
    </div>
</template>

<script>
export default {
    methods: {
        nativeLink (tabIndex) {
            var menu = ['Go to dashboard', 'Go to chooseVehicle', 'Go to guide', 'Go to reminder']
            console.log(menu[tabIndex])
            switch (tabIndex) {
                case '0': window.webkit.messageHandlers.AppModel.postMessage({body: 'Go to dashboard'})
                break
                case '1':window.webkit.messageHandlers.AppModel.postMessage({body: 'Go to chooseVehicle'})
                break
                case '2':window.webkit.messageHandlers.AppModel.postMessage({body: 'Go to guide'})
                break
                case '3':window.webkit.messageHandlers.AppModel.postMessage({body: 'Go to reminder'})
                break
            }
        }
    }
}
</script>
