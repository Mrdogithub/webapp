<template>
<div class="orderSummary">
	<div>
        <bar v-bind="{ 'title': '订单详情', 'goBackIcon': true}"></bar>
            <div class="content-wrapper">
                <div class="input-wrapper">
                    <p class="input-title">服务车辆</p>
                    <div class="info">
                        <img width="86" height="43" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAABICAYAAADlPlcwAAAMFGlDQ1BJQ0MgUHJvZmlsZQAASImVVwdUk8kWnr+kEEgoAQSkhN4EKdKlht6lg42QBAglYEJQsSOLCq4FFRGwoYsgCi4qIGvFriwK9vpARUVZF12xofImBXR97bx7zvzzcefeO9+9mRlmAFC0YeXmZqFKAGTz8wRRAT6MhMQkBqkPEIAeUAbygMZiC3O9IyNDAZSx/u/y7iZAxP01K3Gsfx3/r6LM4QrZACCREKdwhOxsiA8BgGuwcwV5ABA6od5wbl6uGA9BrCqABAEg4mKcJsUaYpwixZMkNjFRTIi9ACArsFiCNABoYt6MfHYajEMTc7Thc3h8iKsh9mCnszgQ34d4UnZ2DsSKZIjNUr6Lk/a3mCnjMVmstHEszUUiZF+eMDeLNf//LMf/luws0dgcBrAppAsCo8Q5w7rVZeaEiLECxEf5KeEREKtAfIHHkdiL8d10UWCszH6QLWTCmgF1AFDAYfmGQKwNsbooM9Zbhu1YAokvtEfDeXlBMTKcIsiJksVH8/lZ4aGyOCvTuUFjeBtX6Bc9ZpPK8w+CGK409FBBeky8lCd6Jp8XFw4xDeKrwszoEJnvw4J0ZviYjUAUJeZsBPHbVIF/lNQG08gWjuWFWbNZkrngWsC88tJjAqW+WAJXmBA6xoHD9fWTcsA4XH6sjBsGV5dPlMy3ODcrUmaPbeNmBURJ64wdEOZHj/n25MEFJq0D9iiDFRwpm+tdbl5kjJQbjoJQwAS+gAFEsKWAHJABeF2DrYPwL+mIP2ABAUgDXGAl04x5xEtG+PAbDQrAHxBxgXDcz0cyygX5UP9lXCv9WoFUyWi+xCMTPIU4G9fCPXA3PBR+vWCzw51xlzE/huLYrEQ/oi8xkOhPNB/nwYass2ATAN6/0YXAnguzE3Phj+XwLR7hKaGb8Ihwg9BLuAPiwBNJFJnVbF6h4AfmDBAGemE0f1l2Kd9nh5tA1g64D+4O+UPuuDquBazwKTATb9wT5uYAtd8zFI1z+1bLH+cTs/4+H5meZkFzkLFIGf9lmONWP0ZhflcjDuxDfrTEVmIHsfPYKewidhRrBQzsBNaGdWLHxHh8JTyRrISx2aIk3DJhHN6YjU2DzYDN5x/mZsnmF9dLmMedlyfeDMyc3PkCXlp6HsMbnsZcRhCfbT2JYWdj6wSA+GyXHh1DVyRnNqKp/E23bCsAU5tHR0ePfNOFrQDgENx3lK5vOtNmeD5aAHChli0S5Et14uMY/s+gAEW4KzSBLjAEZjAfO+AI3IAX8APBIALEgEQwC1Y8HWRDznPBQrAMFINSsA5sApVgO9gF6sB+0AxawVFwCpwDl8FVcAPcg+uiH7wEQ+AdGEEQhIRQETqiieghxoglYoc4Ix6IHxKKRCGJSDKShvAREbIQWY6UImVIJbITqUd+RY4gp5CLSDdyB+lDBpA3yCcUQxVQVVQHNUEno86oNxqCxqAz0TR0DlqAFqFr0Aq0Bt2HtqCn0MvoDbQXfYkOYwCTx9QxfcwKc8aYWASWhKViAmwxVoKVYzVYI9YOf+drWC82iH3EiTgdZ+BWcG0G4rE4G5+DL8ZX45V4Hd6Cn8Gv4X34EP6VQCVoEywJroQgQgIhjTCXUEwoJ9QSDhPOwn3TT3hHJBLViaZEJ7gvE4kZxAXE1cStxCbiSWI38TFxmEQiaZIsSe6kCBKLlEcqJm0h7SOdIPWQ+kkfyPJkPbId2Z+cROaTC8nl5L3k4+Qe8jPyiJySnLGcq1yEHEduvtxaud1y7XJX5PrlRijKFFOKOyWGkkFZRqmgNFLOUu5T/pKXlzeQd5GfJs+TXypfIX9A/oJ8n/xHBRUFCwWmwgwFkcIahT0KJxXuKPxFpVJNqF7UJGoedQ21nnqa+pD6gUanWdOCaBzaEloVrYXWQ3ulKKdorOitOEuxQLFc8aDiFcVBJTklEyWmEktpsVKV0hGlW0rDynRlW+UI5Wzl1cp7lS8qP1chqZio+KlwVIpUdqmcVnlMx+iGdCadTV9O300/S+9XJaqaqgapZqiWqu5X7VIdUlNRm6IWpzZPrUrtmFqvOqZuoh6knqW+Vr1Z/ab6pwk6E7wncCesmtA4oWfCe42JGl4aXI0SjSaNGxqfNBmafpqZmus1WzUfaOFaFlrTtOZqbdM6qzU4UXWi20T2xJKJzRPvaqPaFtpR2gu0d2l3ag/r6OoE6OTqbNE5rTOoq67rpZuhu1H3uO6AHl3PQ4+nt1HvhN4LhhrDm5HFqGCcYQzpa+sH6ov0d+p36Y8YmBrEGhQaNBk8MKQYOhumGm407DAcMtIzCjNaaNRgdNdYztjZON14s/F54/cmpibxJitMWk2em2qYBpkWmDaY3jejmnmazTGrMbtuTjR3Ns8032p+1QK1cLBIt6iyuGKJWjpa8iy3WnZPIkxymcSfVDPplpWClbdVvlWDVZ+1unWodaF1q/WryUaTkyavn3x+8lcbB5ssm90292xVbINtC23bbd/YWdix7arsrttT7f3tl9i32b+eYjmFO2XblNsOdIcwhxUOHQ5fHJ0cBY6NjgNORk7JTtVOt5xVnSOdVztfcCG4+LgscTnq8tHV0TXPtdn1Tzcrt0y3vW7Pp5pO5U7dPfWxu4E7y32ne68HwyPZY4dHr6e+J8uzxvORl6EXx6vW65m3uXeG9z7vVz42PgKfwz7vma7MRcyTvphvgG+Jb5efil+sX6XfQ38D/zT/Bv+hAIeABQEnAwmBIYHrA28F6QSxg+qDhoKdghcFnwlRCIkOqQx5FGoRKghtD0PDgsM2hN0PNw7nh7dGgIigiA0RDyJNI+dE/jaNOC1yWtW0p1G2UQujzkfTo2dH741+F+MTszbmXqxZrCi2I04xbkZcfdz7eN/4svjehMkJixIuJ2ol8hLbkkhJcUm1ScPT/aZvmt4/w2FG8YybM01nzpt5cZbWrKxZx2YrzmbNPphMSI5P3pv8mRXBqmENpwSlVKcMsZnszeyXHC/ORs4A151bxn2W6p5alvo8zT1tQ9pAumd6efogj8mr5L3OCMzYnvE+MyJzT+ZoVnxWUzY5Ozn7CF+Fn8k/k6ObMy+nO9cytzi3d47rnE1zhgQhglohIpwpbMtThdecTpGZ6CdRX75HflX+h7lxcw/OU57Hn9c532L+qvnPCvwLflmAL2Av6Fiov3DZwr5F3ot2LkYWpyzuWGK4pGhJ/9KApXXLKMsyl/1eaFNYVvh2efzy9iKdoqVFj38K+KmhmFYsKL61wm3F9pX4St7KrlX2q7as+lrCKblUalNaXvp5NXv1pZ9tf674eXRN6pqutY5rt60jruOvu7nec31dmXJZQdnjDWEbWjYyNpZsfLtp9qaL5VPKt2+mbBZt7q0IrWjbYrRl3ZbPlemVN6p8qpqqtatXVb/fytnas81rW+N2ne2l2z/t4O24vTNgZ0uNSU35LuKu/F1Pd8ftPv+L8y/1tVq1pbVf9vD39NZF1Z2pd6qv36u9d20D2iBqGNg3Y9/V/b772xqtGnc2qTeVHgAHRAde/Jr8683mkOaOg84HGw8ZH6o+TD9c0oK0zG8Zak1v7W1LbOs+Enyko92t/fBv1r/tOap/tOqY2rG1xynHi46Pnig4MXwy9+TgqbRTjztmd9w7nXD6+plpZ7rOhpy9cM7/3Onz3udPXHC/cPSi68Ujl5wvtV52vNzS6dB5+HeH3w93OXa1XHG60nbV5Wp799Tu4z2ePaeu+V47dz3o+uUb4Te6b8bevH1rxq3e25zbz+9k3Xl9N//uyL2l9wn3Sx4oPSh/qP2w5h/m/2jqdew91ufb1/ko+tG9x+zHL58In3zuL3pKfVr+TO9Z/XO750cH/Aeuvpj+ov9l7suRweI/lP+ofmX26tCfXn92DiUM9b8WvB59s/ovzb/2vJ3ytmM4cvjhu+x3I+9LPmh+qPvo/PH8p/hPz0bmfiZ9rvhi/qX9a8jX+6PZo6O5LAFLchXAYENTUwF4swcAaiIA9Kvw/kCTvr0kgkjfixIE/hOWvs8k4ghAI+zEV27mSQAOwGbiJXkygAjYx3gB1N5+vMlEmGpvJ41FawCApD86+iYHADnYPgeMjo5Ejo5+gW8/7DoAx59L33xiIcL7/Q4bMerROwh+lH8CGrJr/zza4oEAAAHVaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHRpZmY6Q29tcHJlc3Npb24+MTwvdGlmZjpDb21wcmVzc2lvbj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6UGhvdG9tZXRyaWNJbnRlcnByZXRhdGlvbj4yPC90aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoC2IAFAAA8ZUlEQVR4Ae3dCbyfVXUv/IfMCRAgYU6Ak4R5FFAQQcUBBxywta1jbQGhowMqtw71Vm5fx1ZtvaWKXive29Z+bhUEAUFmkHmUGUJIIGGeA5mH8/6+6zk7OaaINkDF+2Enz3mmvfez91q/vdbaaw//dQYTuhfCCxR4Dikw4jnM+4WsX6BAUeAFkL0AhOecAi+A7Dkn8QsfeAFkL2DgOafACyB7zkn8wgdG/T9FgnSUV+aoDnP6zCtXrkz1BruFixZ18+fP7xYtWpx3K+v5OuusU1V3HjFiRB0jR46ss2f13nkNAq3qig91yn3Ls5UrV/hU5d3yGzV6dCfPkcnfedSoUd3oUaO7ESNHdGPGjFkj5/93b9f5TXVhrFixohi6MucVARMwYDiQ5aI4htmjw9hRYSjALVm8OO9XdstXBHyJ4z0ANFCMGA4yOfo/BMZfCoF8cvmK5d2yZcu65TmW5liyZEndr1i+vFuZby5ZtrQbXDmYPOU7opsydUo3egiIrQwF2pQNIH/lb//Swv16I/xGgWxpmEYaLVq8qECFQRMmTOjGjR9fAFqydGkxc50R6+QcEAZQpEuTSqOAKMz1fh3gcg2dya3kUZg7hM+ce4kHnI3xq88wmudJCTQKI6+Ro3ppNXJEzqNHrQZvvvV0ARgB07eWp9xLU4+lSwPM3G+yyeSSekD3mxqe9yAjsR599NHuvvvu6x5//PE6iimRDgj/5BNPFO1fe9BB3cT11+8eeujh7skFT3TrrrtePcewZcuWd4sjxRYtWlgMXLhwYbdwwcJu8ZLFHWCScAsWLOiWLsn10jA8eS9buqxbnGtSyH1/RGoCb1Sjc0nOAMF9AydAO6jHdnY9btz4bt00iPHjx+V6XLf+xIndpEmT6plGMnnyxt0GG07s1ltv/W6TjTfuxo0dWw1B+UljUlY+v4nheQuyZSHuAw880N0bcN18883dbbfd1t1///0ByqJ6vn4ANXGDDbrttt2223XXXburrrqqO/zww7tJG23U3XLLrd3pPzmju/fee7tFAZQ0QIZhwNIA0kDS1BeVJTSgNIY2sDSV5vlqqRYVPSTtVkQlNgnYg3Flfcu175akynnBk092y3JuecivbLZIv9Gjx1RjWXfddbtNN92022yzzbppAwPd1K226jYO+KZMmdrN2HZGqXnpfhPC8w5kbJoHAqaZt9/eXXbZZd1FF13UPRFptVHA8+CDD3aPPPJIqY+DIrlc3zV3bjc2Ntdhhx3WzZkzp/vTP/3T7sn5T3R/87d/21108UWVDkgETHY0ELXn3j3VNRAI7Vw3Q388a/k5DweMe6Bqz9wL7kuyBuytg1JglFfsOSBtaZ0bUKn9USNH9RIwjeslL3lJd9RRR3W77777UGme36fnFcgeeuih7sYbbyxg/eQnP+nGRmVsvfXWpT4efvjhbtYdd3TzAqoDX/WqqJX1SjrppUmHga95zWu67bffrttvv5d1p55yanfsPx5bNhuGkWYATGKI24DW2NPuSasGuHZucZyHA6cBwTPX7V2TWu2+gaXdt3QtP/ctvWfit3fK0N4ru/pS7STdYYcdHrB9+HnfU33eWJO33HJLgevEH/6wVNwuUYETAyQ2E4DcedddZY9tsOGG3QaxZ+ZHugHEE1E942PTTJk6tdsg6vO222YWyHbYccduw8RdsODJML8rsLKFhjO8MbIxGAiHq1TPxQca55bWc3m1HqDngjMgAYaytXzbfcuDTanTQoU7e++QVpoWPFN3wGqGv/camLJ+8YtfSKO8ofv85z8fNTqlJXvenZ8XIPvWt77VnXzyyWVz7RZwbbb55sWABbGnEPWxxx6re4b/S1/60vQuFxchMe2J+L9+93d/t3vta19bdhs77N577ummTp3SbbPNNt21115b0mv77bcv+4YUaAEThXb2LcdwieMeyBxAUZ2GlOuOSFVqvIFEGqGd62bYH8+VF/he/OIXlx05a9as7rzzzlsF1pZWecQFrgMPPLC78soryzSYmMbluUCqTZ48uTvllFO6mTNndl/5ylfSuPYb9sXnz+XIzyT8uopDanzyU5/qvvnNb5Yx/9J99+02ibELTJip57hVJNTcqEg9TD6tnXfaqVo3RjwegM2YPr1729veVkwgXeRJUsyYMaO7e9493fXXX1fMYs9536RAA5QzxjkawOQ9/AAkDOcuIR03TyMgNXU+pAFc8Vt6YHHdjnYPqG95y1u6nVIH76ZNm1ZnnRr5C+I6Skqn/hrH+9///mqAQKks3vmeoEwa1oknnlj5yfv5Fp7egfMclnZhGHPkkUd255x9dkkYxJmc3tMjsb2oPyB53/ve1+33spd196eH+WTU4taRTK1XpvfJvfC6SDDAwjSqRTyAEnbYYftiHsaQOhdccEEBuKk6KmjNg4RoAMNMhyB/QAQU39lkk02S/w51L4/hjG9Aka4BzFlaDUZ5HRrTPvvsU6AlJYcH8dHhtNNO6+bNm9f92Z/9Wffbv/3bBWgN0PsWmoQ74ogjuuOOO649ft6cfy0go+L0Bu8O8fYNkUmeHdJi9RYPfvObuz/+4z/u3vnOd3Z77rVXd8IJJ5RdhqhbbLFFqSzXCD01Um4gksw1SYCBN9xwQwHCs2nTp5UvCnO1eABi+w0H2cgAxPM6AijnBrxVz4feNzABLcBdeOGFNVyFm8rkaABtz5zbM+kuvfTSksotD+9f/vKXF+ikb2Bt18rw7//+7/UdPeoPfehDVX7DZIJ4AkCq19Ef+1j31//jr1c9r5e/5j//5SBDnMMOf3/5v/Y/4IDugjBq5513jgN1Qbfnnnt2ewdYnKM84HqaV1xxRTGJ/YEBPOIYvDjAfFlsEODi3adK50cy3BSfmvBE3Bj8Sltvs3VJEGkxQU+UFNFzLTANA5WxxuEAcy1NO6RxjaHXXXddgUUcjG6qEaDct0NZ2jXAKPvtcc8AmbikIqnNcF9TmslTL1L8a665pso9PY3qYwES/xkTQh6Cs7JtGAfvZz/32e5TMUOeL+G/FGRU1h/90R/FhrinWq9WTdTzgWHcgQceWC0WI8aGYBecf34xBSMAho1GzT6ejgDGUZ0ctuumt4XUBsJvjCSjXnQWMHX77bavuECGsaQaGwpD3A8/AKbdA69rjBffQRXr1WG6bzSAKYsyOzemD2ew5y1Ic/fdd9etMrU0OjRN7XvZ8vFeWc+OWeFaGdiCH/3oRwucGs3wYHSAE/erX/1q98lPfnL4q1/b9X9Z7xKz/uK//bdudnpl7CzDRBhFVTyWFvm773hHOVURkQoT/9z0vIDFs5132RnlS2ViPtX6jdgfhmoAd//99y+76570LAHv0cceLaJuFzWMsZiGqQ6AIZUa85/q7P3ll19eEqSBiWQRxG9SyfWaAGv5tbiVaOiPdCQQsDaQaUQ7xuVCmim7Btfy8E0gu/POO6unvPfee69qJB/84Ae7448/vqQ9Sa+ODvRhMwKafLg4fp3hvwRkCHp1hn1+FhXzohe9qGywW9Oj2na77ep6etQF1wV1Jxi3o0YBSedAK8cEdhXmG+Ce//j87rQfn95965vf6E6M3XZgpCAGYQimscmWLF5SPS6+NSoY8TG2qcsGDt9sTHWNseICtwAYnmGgNAKJ2K7rQf7Ie80gjSD/lgcb1EEVeuYdIL8qTuZ/+Zd/qXwbYFq5AI802yvmhPJI752ep56udzRCK4PyN4mmR/wXf/EXq4rmm2jQ8kbTlm5VpGfx4jkHGWaQWAxuhHK/OMwDgp3SO+NMZdCWXRXihZPVyqmrk046qXxd6msMEmHZdEBr9sNB6VneEhvsop9eWBLv4YDS2CWwyeexxx7pNt5k027rjPvddNNNq9wEGAiMGIvY8hMa0Z19X1nFwQDPHK4bMBroPHfteQueCcOfiTP8GbDIX1nE2yrl5B4hvT0Xv31XnLvikNax2WOPPYp+QK5Bvfvd7y7A8jUCVAOMPEi0Y445pgB36KGHVt633HJrGu6+lTeaMmPkZcD+uQjPKcgQjpjXqs6LfYVQCDc3oNsoxOBULedrjFjgqblgqaUKv/71ry+CYTTemIUg/Zi0upq+Y7pOXrzxjQd355xzdjlHuTo2DlH1Mu+cPafbOupns823qLG+q66+qiQh6XHrrbdWubR86hpjfLMBA6G1buBrwHBuAHM9/DlGaTQNEC0v9Vd+Z++cxZU3qSwPDZBRz87D7JaHMrg278wsDx0bDYLzlTaQvoFfnr/3e79XQPve975Xkg2ABd8Cng984ANlyx100Ou6888/r9w76o+mDnmYgED6tbpVBs/Cn+ds7BJxEZCa0qLe/Z73VI9ozJixaY3Xd7vssksRgOGvfRdjcmaL7ZTe5itf8YqSPnp8E8ZPCAFj3APbiIBtbD/MAnBz07q/9j+/VoS8+uqry5Puu+99z3u7N7/5Td1AHJ7mZn31K1/urrzqylI19b0w3LfYMsZHAaAFkyAHc8zJgPuSTP8xs0L51Mm5XTcQTcs3OE3byEQDlXqTiNS/erQAHGaOAJEeNAaL20vV5TkvKUYThsuWLwvYV2Tmxvzq9GiYr3zlKyu+hol+6qAzwKbjV/u3f/u3oq08HUAjru/96Ec/6rbccssCtF69d8DNP3ljpD2zRA/22QzPCci0aiprRCrA1aA1mVFx2WWXl8F/1113VotpLdd7jFFhZy33D973h92YcUB0Z3f/gw/E8bqymzxpk3pvPPKxxx8rFcohO2v2rFKfjH7MI8kwXeveJzMWNo9/jVQ6P9L0Zz/7Wdl6AGHKDZcI4isntwmpS0qY4wUcyghcgD5ufC+JgUSZxdWz3S0Nhl1pNIFJgOHSGdRHB05XwByTaTwkqbAwc9t8Fwib1FH/yK6IsJ4W4onTzgXulNG4LTWpns2Vgm7ykZ9hJoAVp0lfeQAaN9Gxxx5b5bnkkkuqbHPSmMTlh+Qe4X98NsOzCjLMUBEGM0Yhitmo1KB3jZgIQoqYNLhoYT//nqjmpNVSzR9T0UWLlsR1MSnif8PMsZpYknDF4Ipu/TDz4YcfqcHhiy++pLt91swAZkGBR2sGKIT76Ec+2r3nPe/uxobxBtvXC/OVwffF4Q7h9gACgKBuH4xLwHNMwqAakI9hrT7rBSCjMkd/RRpBKtWtCBiAQF7q1yQX6cIWYhL4pndcDYZ/MFM8YHQmMRvQk1k/23YYsDDbNxzK3a49p+aAVlnVV0fJpMgYpKsaowmbetPSqo9v8rEBo16uhqls7EFl4gjXgJ7N8KyBzNRoLQyoEFWrVKlc1Lmuh0peLTZEY2c0O4xUwADB9UMPPdidddbZBdr777u/u/ueu0NMzFwWH9r47lUHvipui5fJvjvhBz/oNordwfa45ppru0suubhUEDV2zGc+E4CsW2WYMCHSCXNTxqebaWp+Pl8cKYQJwEHyYcKM6TO6bQa26TYNiHxcQ8JAgcwBGveeux4fcOr9qbMDIAAaYxenvoDCjpS21gIkTQPUcFC179Q8tKH823ugMBlA41Re6rPl4Sw4y8PRGgTAteA90L0jrqRnOzwrIFNw44WYZ2pOETQl7avXVetJLVcBznuga4R3Fobfm6Q3NuqyBQRFHAz6p2//U/fP//zP3VveekgGx99aBD7jjJ+ke79ngevhTMGesO6EatlGEExpNv9eD1bLJi8QuLXspvra99s3h59JA7benHQo1HXiBhMzQ3XbbtrAQEk55XOsGRqz2/P6ZuiUypa61yOWbvPNNu9GjxldYGhxpVUmZ4ewMhK02YiNJvIs2zZxr7/++mqgpP8qYA6VrZWllZM0QwfxBO/ZyhrFsxmeFZA9FnWzPOCi6hqj2llhF2fxBynSjN/2DrSQzr3QnpNomMq2IdUE9p3FH4hCopxw4gndl77wxTh29y9H7IZhuunYekxl+6y3bjEf4UiIInCuDawvXx4pk3/UnHn9pIswPmVcf+L6scXG9fZNbCgLQlr5KlL+UG8PRsoBm7KSHJMnTa5yyfdXDVS3hmnkgk9vTDo0vyi0MrSzeI1eDTzA5rjlllujDkdXudRNx8LhWkMFKof0Ghi3CbrKh4vEM+oTcJkJzcz5RWX7Zc+fMcgs9XrggftLLShkq6gKqJje4KOPPhImTEpL7ZemiZca9WUbAph0CLAwNprz4zHs+bfGsjG03p+rCeKMqcFzUu3AOGLNimWPPBRJNybANCwFoOwPahlAi0FD321quhiUOlgB9dhjphgtKJcGgHuHwIgOeCX9Rq6WwIpEKrDpDHmNCKPYi9JI2xpRK3rVe+hplWXoRYEtaQWStgeAu9b4XP98GJ5++Bt5VeMJoJpE6r/bO5DRtuzhCAQdNOSfPn1G8U2efHFnnXVWNXCNWWcACDVegFub8IxB9uDced2IsaO7JSsGI/4XpGUr/IKSFlfFpTD3rrxfZ7B7cXp5kyZtVAToolUoFs/xHIBIqhUB05VXXlWgXTfqbqeddkyL2iZEX5YWn9kSYQTgYPbIMFtLe+KJJ8u2AaKNNtqwCEc6AIaen1m0zbDGMmrT8rUWfBtxMceBAY/G/gp6Kn0/7z6TDZOGOvN9asa5gSgyNrkM9tIi0hFIqLWR8eWx/SpUPX2tD3W1+k9y6OOOSr10LEjb1SH59/+HHq157/HqZ+ozHITtns9txJB/0TMNpBpDrjECDQUgIyAAy/sNoiW22WYgdR4z1IBXmzGV4Jf8eYYgG+y++9ef63Y7+I0Z/c+QBkZEvQCBxR1oeHzG1u6L4fzxT3yiVycNVQiRGP2tcy8F9Uy/8IUvlBH6l3/56UiGdUsNVw+OestBeso7pCkmUoelckIY8RDP4otx8clNSO+rlqJNGBc3xPgAZGyBCUFLBQ8xpMCQMjSGcEFwGjdQAWAxKF91LR8ujWbXKH87+LmezJI7naGRaRxUVzE9hU6sqnPftNSgkNb/zaV4GpAArOgDA2rbn/trla/HbleF4XH6h/XdljYZqLMvDq97H6ePz6SZmSE/poBJCXiJFuqx66675PlDkfR9b3vVZ3/JxTMC2fwYrf/zc5/r3vDe93Z7xwtdRE4LbgGzEaoZ8K4rVJSeKe772/4es4nxsgUCBKAq1ohULgMp+jStVfpufSu+NICzdrJ3kfR2CLuLg5XfCzB6kMRJGpVaKkX6HAjqaEEP84Ybbuy2nLJl/yhlsMWA9BXCZQt5SU3lBUioKJDne4tjZz3xZD9kQwoATw9EqVVIQ+uvPHHTAwdYdI5Im6JO3fcg61OsBkbfMfAun14FSNkpBzOkT+dJH6Tt0/dn71t+6sYe1tOkKsenJ29lPNvTsVlGBO65975u0802LXq2PJ/u/MxAFhvmrHPOKVvrxZkdsHnsH6IeIRFfBVENmXTnW0AmocjcKJA0KtqeNYBWyw+he+b0Z++EIpZ8krYdvl+MSRrXJCMwAQeH7ooQjF1ChY6K6pw58/ZuTnxM/E1sK0Tmo6OKtWT2nPHV3XffLWl7/xqnrTx807dane1zoUGxCUlKddaw+OKAnn3aQFxA1GiSvi0Oxkz3eo+pnIqpZYHFt3pSObP5AAjYe4du0UScAhXgSYmePV0BvCZoDr3vVSdbVayelpUiN2jgmfjyRefiZcXrtdVNN9+aqfA7rHqeV78wrG62vzDKL36xLARUUb4rOrwKPEgkjyjU33HHHatmtbZcWouRTktVIZKASlFJDCKyAaBUUa7LcO8p3FEkINZAVecQohhelNU6M4tiXGahxqPNmN97773KvijGJi7VSl3cFs84X9jr3/D6UsFGJYCC8XtzBvQfimrwWYP7pkkbhjEENTAwUGsR1ov/TTlJSXkC35NxCmNt1QGzwlSjBZh0X/x9fGOkJrWuXgAqqKtvF4PzUVLRdWRnygBsgroBBMb3owbsPg0HPc0lq55z8gdc31EmjcP3W571LGVubp2xQ50a5eHX4wlQpyXVMWjmwZgyd5RiVtYaXHD+eaH5im6X0KQB0LunCs8IZHw8gLVy2WDpaYwOfSM11unuiD9pXhyDY2KjeVZUqRL0cTwSJAE8zOJs7VtNT0yEqxYYYjPmedtJCpLJsv/xdY76YweGQECEUcoBrBalAD9nZ3hSAUG4MZTn7rvv6V7xilcGOFvVcjxDUoxdw08vyYoief30pz8tF4mRDGtB586dW8DRoTCwvmVUyi677tZtm1XdANjGEalHkslC49nzZtfUpA1iy7BnbPjCdtUYi0EKVzQK7ULPFK7uSSGhGubQe+/cA+nJp/+0GzNqRDoq6Wglz/333bV78V67Bmg9CNWxt700zWTQ/69vyKNyj0TsOzdZeBxaLV68MDbY/KobU6JMgKSmPtXflCKN0AqxDfPec3V+uvCMQGb+FyOcL8kANmdnSZSIGsYvf1WzQ6oQjVB1phbyNAegCoCEviFjnb3XMh2Lc9NAPJz4iEASAuTAwNZ9jyhgI0kGpg2UCwMjqTf5I653gpVOl1x8cdIcXDaVrQ7enDUGwMLwxUhq03w2y9Jq3DHp2WokjzytB9UbvfTSS7rZs2cX0KdP76dTGxKbNjC9Vie9ZJ+XVPmLkWEm8FOnRYoCG/D0nRGqHU1yV2dlXk2nok4B5QNHvitDc/xgpGK0QNw6zBT0KRAVgVPR+siws8oLngvInW+MHj25b+xD5TOCMPP2mdEIl9YYKXfQdtttVwPo1D7aP+cgY8MwBgcGdG9HrZIQPeGUPmI7IKxauGNrPEUYjPtjFVGSuECUirfQQFfnNMqRYUYRHvETMIyjcc4cu+BkuCfhgfsf6ObePa9cH1qqzViqAQyBFUDMtqUK//Vf/7XmtGmRJBefm2Vq6mfGAoBR/cDMD2ZuG+Ai+hvf+MYazqJCxDVcJFxxxeVVRnnOvmN2d8QR7++OOPLIbkX8YAbS1x8ahcAsZecf0zBJz5LImXkB5Gw5NKRW3TeVjxauWyNG23XSAyQdAZTqa0CgRjUKNpYgzehR3DABSp43aeUd4OuRn5S5aaYVKQ+NYUZuz+d+VEK9SHLDWHqf/Iq/KKy1JEMY3XRShroRSAjMCzdzx1gMIQIgBKhGA0BD78qyKowADMsjT+pdD8m+vcp1CHSVQd10K8tGSf5Ry73N0hOUPTTztpk1pHTn7LvKwaq3aqhranqIxPtqabuyBsLf9KaDu69kmvKXszj2gEzhNnRkHNA4KMDyfAM0YgKdQWh2HGCrq6k61IqxTcCjbvWOgc9gvVkSu+62W/fWQ95a354Ql0zL7+JI0asCYPk9GCfy4jii0XV+1JUengbsHkAEzlHf7cHVL0qRF5CIW4b6EEjFlw6F2FlAIT37DZmN9W4ec8LORVtt1W8FYYnfS178kkwK2KDbL9J71u1Z5zlmVGgxuXdqh5Z6nGhj3hkAAr7z04W1BhkCm0HBSESUK6+8v9ti881qYzfvtD4qTKdgMK0wsirlADgH8Vy37U83mAe1n1jiIVwd0oiX4L6C9EN5danbOiN8R3e9N3JvS2+RhDn1tFO67//g+8V46zff/Oa3li3HVmvSQg/T8Sd/8ifdmbE3rg8gLBj+8Y9/XKAhuWB7+6gIks0M3nvi8zMzVQW2iCecp3/TfE+9AINKJfW07rPPOTs9sJ27d/zeO4ox1OC8ufO6k390cvd//vf/juSdUwAASsBRR8BoYGL4c414J3/vXAOeuEDteXOaAiDAeYf5zuIrl162Z00aOkuP5uumA4Mm0qqjmbbOGsYJJ5xY5sJuaSjyUQZ1oybnzLmzOk+mVT1dWGsXhlZ98smnVnef+L3zzjkB2FYlMVTukUzFURHjmQ3p4NEC4gzBph5VhUOQVagqKAFZL+lCsaH4farcllHrubSAvSRThzbddLOsh7ygO/rojxUDZI5Zn/zkp2qt58aTJxWTyh2RBmCKEIlrdoYOAUZhOrWxHIPCHFLCkj3POZb1vExLGhgYqLwMlCO+oIVbhUWi7pspzm9605uq10dKX5jFxaTmueeeW+AyMVN83wQcQV2UF+2c0Y7ac6/DI5578TzTEBzUqvieC9IBPJAJ6I1GzsLwuBtmMN2EgraSf/8s9HnDGw/O+oojYmfe2Z34w5O6F+2xa4D1WMowtnfJhCZp1932qfv+B+zf26uV83/8s9Ygs9mcqTjTp03v/uqvPl3bNO2zz77dp//yv2egup9DhSAGx5cuQ0Dg6GFG2/VVpUaBpwcKwgBo/9aZwOjP7Xr1bS/t+t6YMb9IzGRKdf3B+34/OwDNqvTtD4Ifd9y3ItEOLsLbBI+jtPdpafm9C6JGFMIYzNAza8wo5oe5GNwaCFBiIvdFlTINQl2l22TTTUrN+D4JYJHy1772taoP1cWGQR/lBmJAIUka2HwX+OpbQ5VGC/HERyvAlp7kAyBplce19KQg9d6A55003knfvqmMrtmTOjy+q+G87ZC31Sr+ZamTZXxsMOnHZrSDLcfxndbYLc15xowZsnnKsNbq0hjl5Mkbdz886YTu9DNOr8zPP//csmGOOuojVdECVgiD+ekCNGQV1IYaVNLl5RCOqLzmE+rP/YvW+hC5p3f/XJzB+OXcIQxbwaruBjDOVHYV5hHv389K7AMOeFkZsk8CWAglLA/AWk8PQ+p7KSBVCnT1Lve+z+4BNIwqiZLrCcmnnKBJu4HnpEniPhymmaFi3v33/u17Wfr3WM3YxWAuEUGeyic/IHDt+8omf8G7BjbvHd719FhNI/EcgKcewAcYVc7ct/zduxZcSyOgl73P2JFXZDmgRjR79h3dn//5n2datj02BqMqnyyTwvj0itjjxnMfeeTR6nEqz1OFtQYZ56lZD1bICJyVdqsxn8nYl5agZa36MKA1ZKUsq66BLEBZmQKufua9XDHWuQdXvU/cejX0rpibGHxSo9JjOvnkk6oF2yCOxGCLYKiWeulll8Qfdkm3/8v2y4zVbEuVYR8Mp8oQXb6NcWzE8jGFOYNAo0B5VvUZio+ZgnI55KF1t7wA8vjvfKf7/ve/3+2TzWSmDQyUypUOiKg4gCF5pAEK5WnvK7/cyxsQfNsZXcWRtjWKJsXkq8H1Iwz9LtvtWlp5sankJb1rUt63uWuYBIBpIQ+wnX766TXX7eXxJ9qoL0QpNwlwoqmdMG1s4/vunyqsNcgY9XpcDGI9DoahlUlE9KWXXZoWu0O+N8SUYgQVNFSEOvc3nlX3O4UHqrbR71DMShN65Ox9AkYPgQ44SRmzNwy13Bm70PqBA7L9AXBxT/RJeq+4Zyec8IOsUDogzIra6/oFG7EZiuh6noui2gQAqZGGAKwBq0qY72PUUGkqrkJ65iyug2XEL8fmAog74uKw9wdAOcSRxrsCeuoBBA7gcsbIFhd4xG2SRxpxBO8AhhptwJOHHq804vkeIAAUEAryEs/Zu6pDntMInoln58qDY5/dnvL3axhM7+6XKFqoPXfe3OSfxdhDKr9ervFnrUGm4JyPKmFvMH4UreEHmQp9/fXXpcfZjwOmbn3oMZXr1eAqUOVJi6OSjVl9ol6aMDDFLQbW1VAHQcKkMRWIUXzzTTeWegT2xjhnxBk9up+ff3mGjvi0LP4gBRjxxfDke3NW6zD0i8FhmpkkiI1xrq2OagwFwt6bHrAknxHJhzQmWV1z7aAN5y7f25z0JPeNNPNMHmxHZ+WTf/OvoSHGO9DC952BzbUyy6M9RxmhPZdOftKoB6C4l8Y9aaOxCa6BS1nQwLfF85z08007KQ1Mm9Zdcull3eMkYNLZtNliHh2tGmvNMx28XzSfdq1B9mQ+YiWRwWQVtDGKrv1v/dZv1VQdDsidd7aXWD9bVunK4NfgVwFtCHB5uWpguN4jAfBFBeV+NQjzMMTrH4gYsMk3Bjcf2YUXnl/MIk0Rl32hK671ssk8owJm3X5HXAs7lqSKAih1CXhmu2KeliljIAICxLY0bp0wh98NOOoI88QvlT2skOw4LVuHgMo+6sMf7o76yEeqAXL0kji0ACC4boDCfNcY75vo6tozIHAWXLfgWjwAkkaegnsNT6ejxRFPeYeDFK2mT59eABPPeyCztM7yuLcdckitMmNSGPNcmtGFZctTptAF3VcMppxhkob0O7/zO61YP3dea5BpqZalUZVa4Rve8IbqmcjdTMprfnZNt1tmLjR6FDbyDgmG6NBDrW7Arlcf0jdClVEfevbxe0kmXmLmGbWUHmDuEOpH8T397GfXVa8NM44++uhu2rRp3fGZz8bdguj8Z0pw6223dAc++YoQM7Mz1ok/KcQHBoauuuh1NvVBYo1PvPE1H61fKgcYgu+MSBrlJRFb5wEDCqQxAfTu0ONLX/pi94//+PViOjBJA/x6mSSJvJqkAQ7MFodjmJYQgKMBBvi9J6WkdUgjVLlSJ3HFAy7X4gv8eEyJ4VJuOKgBc6cIiDe+4Y2VdtasO6ozo4O0Im6ffhNldey38NLD//znv1DLEQFzzbDWIGOv3HPPvVXQtvrm4IMPLl8LwlnfuOxduvZBewzGcspWHf0BkIKKqypTX/8hh2zdEFG9+hRXLL1PFySiCgrjwqi5c++qVeStRX/84x8vZhoOsj0BQ1YwJqms5557doaOXpvZEb36M2Xbpi9bZFiIYxHA+MWoToYxkD6e2Rz33H1vGN0PrgP2+lmmt0HWBFj2pvUDCfuO+sToHggZiA+dttxySm25+WDWkHIT3HXX3FoF5drmMyQto9u3HZjufOihh9YqdwBrYEGPBgrPBN8Linp1PfR9oHKI4yyOcpLmerymsE+evHFJMT3LbUIfUm2PdJps6b7euut1p5x6WiQXQPUSVsfGGlXT4y1LNNtjxx13Kv/Z3//933df//rXqzzD/6w1yBDQjy9oDVQSoisogN12263VreWQNVuCxDBYniqH8D3xEcmogIojQD/tBHCoBoTrJVfoiXZ1FNJyow8AdIhtQPj0039cQCAB7Pvg/O1vfzszLF5RYOMRxzDnsaPHdmdmerFt3CdvPDnlzM6HqYOGcGtatyEePh9rJtXFeCTwCBitC//QQw929yeeqUBz5syuYStzyUxTJhE3Tr5WSK2Tsg2mjgp/w/U31jcmJt9JG03OrI0dIsmsjB/f1zd1BGbf6Hu7/ZQjQ1P1LHQy+0FHq6TfxA26BXEjkEokj1VGJCa+sJVNSwJcUhOtByIRzUrht7RjI9pwoo8cmQUnMfSLN/nG/RnztQTx4osvzfV9ec9lw39n3cXjaSD3F28BdPq0GVnIs1+3cepsyraV6/ZFY0IND2sNssoknMbQgW0GukeyWIRdQ3xvkk1O5s27u7sjld3zRXtmFsIO6bFsFGL2PilMXRJiUk+L4kYAVIdFJAi2dJnV3P2vgphoiAD+kWdaJfGMEWPGjOvuu//ebPF0WaW3w430VkYz9l3bUgpzMAqYH4gkse/snDtnh+gbV17AKgDTo1FvN0Yd2nJqvYwzYkQ/vajfyVB9SXHMJHkeie/LouB5cVaarj1r1uyMZ/bSk6rbPENtmoTyLgiDFy95oJbVKZsxxbJtkt/4zDnT4CwsNk1o9OiRAfz9sSv3yYTJPQPYlRnCub27Nhpi5Ag7AB2YH8i4JpvSnFhA0HhHJZ093ThOLVLeOFKKi0E5H88uSK+KPagxk6I/vejianh6kjSDsjeVjxymT5lJPH68mcoLuttnzswinQdqVdYrXv7Kbo8X7RFTafMCvC0OAFlv9tRTT62tvIqgQ3/WGmTsCSJF6408Kh8L1cSmIdUw1I475mj95CdnFtO32mpqNyVqY3KGdtab2H+6WlDEcZNqCF1jitH9SxYDYT/tl2EPhO4BEkAx/9JLbyr1M2XK1O7Vr351qWvDOu9617vqV0pstaRMCKA39PAjD8dhPDVjlWfG1nlJGEuNZIlYvuvbZjFQB4DJFmJ/3RXm+rY1AhtGGmKMRSvrRp1M3niTjG1uW0S2b8WTkXT3RRrccsvNyWNemkaXRrh12V+Yz8ZT175BLQxYV9aiaPt7GANdtIgLRWMamaE5KrS3/zQD6SzMUa4nQg8qeJs0cGrbQp2FeUZykWgkaS2GTuMiiQz0j4kfMUyr6UGmaZG0jBYb0KC5qdZ8L0wcPUhO5fUiMK5MIzac9M53vScNdJfwev3Q89Eat7w/w2wWW1sdJjyrIPNRUoujkyeb5NDtbS0c0Ih2koAIw7QbbryxWjQ7Bii2jVrSGqiXZrQqKGbXsV6vSntd2c8tWxa1tizgWxiwjR83IQt9/1cYs7h2uuGT0qOkLvySiblPbCplI6UefujRkoSzM6ES0b2j5paNMOyV3lL+Aj1JohH99KcXdd/97nez+dw1pZoZ6BMm2EN/aVp4Vn4HYEwEKg1ATD/fJoDaJM/bRssP3PdgOkjzu2nTBmqSJBXG5QKQ8zOhkVTcdecd41u8rOhnTpi6K6+O1eIlAVkKljZbtDXjxRalGqopR2ZOqGeKXUDx+wVsSQ80BGVVf9ubsovLnZGZF1b7q+Mdd8wuaT518ynZU+SOkl7Ap3e83xtel/f9IP6ee9tmdUmc3T+sDXPuipsoxUwn6tbu5Qcc0K0su62rhk3lbpY1AC2stSRjQFqlLOhBad10MZVJd/O53JHxw4ULAoYwxMJbLZ9koCquuurq7EZ9UakFOn3atIEY5lOLaVZTW842HHj9FOPYECvj6+FnmrRBTY2ZObPfntxGIqZPs7sY+uecc07ynFbfU7Y58VOZtqLcW03ZplTRXekwTJs2vdwSJMzyzPCljjWQa6/9WfeNb3y9pCaJt/Nue9beGw/ef0+32x4vioq8pzvvvHNVvwKAb5UJAib5YbQ0gLDjDultrchExwBt30xc/Orf/X1NiRodtbUsJgFH9Lx75vbSOVJnYqbZ0BBUOInqeuxYowLZj+2g13WvPei1AUJ+9CIc3nnnXbuDXve6mjNHGkcoVzqdGHPKgJ3UN6mUuYCeY0IDjmvfJhQej5ljcLx6vCXVMyLw+KORjHsHvNuHjucG3Mu7EzNqcVGmJrFtgf7ww/+0OyuzZKdMTePJFhL5dAVbOtx997xnB2QlaUKg17zmVSHC+Ez1uSJTct9RTPVOi7Go10Yq62cIxzNDNaMzuDoxlQU4BdZ5sPXmfZfe353xk7MyqY9jdWy3yWablLE6Lepgy6lTapqzlUZsohbufnhe+ZsAy7DW3/3d39UK6COOOKJ6kmeccUbtm09lAx6i2Wrq4p9e3F15xeW1ayF7ksoKW0t6TEi5GOnHHvsPUVVPdkcecWS378te1U2bsV13Xeyhf/iHr3U/OumH3dEf/1Rsnkk1LYjPjEQbl96qxsV+ee97/6AaHrNhdKS5XqVhN/Pi//3/fr+kCxoJptsYdCa9HAKmkRxssw1qwgFXRL1qgr2/yd9eAgOYRz1AXaG5Z8ogXyrYBMaz0wDPPfvMPDPVp7d1gZr5wX5z/f/99THdOeedXyqXq4gngcSW5rDDDu/22/9VWQa5RXfuOad1jz3yQAG2vp60zCZmSgtrLcmoxUczMKo3tttuu5feR8i3vvWtkQDfqJajpVCTu++xeyrM9okySqVQkPGuhY1fZ92aNszemDRpclWS8Ttv7t3dzFtvKxUh3vrrTaxlWNwQutq62DfdeEPZBi9K54IE4ug0/nbsscfWj1vZOorU5MvT0i+Is9akvHHrjqv90qiu3rNtxmn2zc/cOOX95jePS8vuf+Lwrrnzuu0eeag76UenlyQ65JC3d1/83F92mwRgfncAHRxMA0A3VdtUnh+fekp2+T6igLpiRDzwobgfG/vAB/68JCBmCsotKCdQCPLrw2DNTj01M1SLbkPyAlgY2gJAOFa/L6TVsx5kPQQ32mhSOZDlDdx9/GxukwYiBhAa/zVa8sUvfjGNeUI2cLmltMaCNDaqm4QX9+xzz++uvvb29KoXRXpvWSDTmWuBOTI8rDXI9Ly2225GR93wXmOOilOdgHbKKacWA+/MeOIuWRQKW4x1No8K8vAXUaslcRbqHdkbbN1IxjFlzFo/uTTGOluC1JuXb8y6/fZqfeyJB9JzEqhDKprvh8MVuPie/OSNXQlJ2YGBgW73jK9Onz69PNkmJpp7piPBQBbuTo+YiiSBG8NPOeVH3fY77BRgb55u+hkpw6x02w/o5qSHdna67dQvoHArcCc89NBDxczLL7+0OyS/lMLoRheMRScgPPyww7qvROqSylQYkKySagHamvP00UscAGnXRUNETeDyyesKDVjiDw+kLfvT95RXPMASz33NpojLiTP193//92MjXl7AR3v2l3QOje/MzLrZ/+WvTjnX6V6674tjp51YPrX2PRpgeFhrkCmc3Zf/Nj/5V26MMLHZWypEj7Od5oYZixYaiM7GK0E7kKlgG0bqu8096PRsSBy0WydiGYN40Ynoan3p5vsuO8Y44iOZ0yYuMd9LpOU1K0QcfiIi++A3HVxTnD/zV1/o3n/EH5aTmC2ph3ZvVIAeHJvEUJBZsR/+0Ae7rSIpuUGATb7nnXtWbaK85RaTo/r8ntMT3fHf/kY1qOHENPNV3QGN4b9PbDAMvC8mg06GWbRGJQ7P7xhccMGF3RUBv6lImO074gJPP0O4V3PDwVTvQg/0Gw6SUC3F6KXZ8HfiC+hRdAvte/r1PGjAzsNSzQTEMcd8pmjKZkb7LbaYUrS8IubFvLg52HY77bhD9v19tNs9GoTf7EMf+GD33cz0FXzTENzwsNYgk4kWqlK80rZy4pAjRW6PtAE4Ppk775rTuw8ilRBfyzBrIvVNWF1p7U78ZUtjDPuXfIHJtVorfCMUolSLzHIwz7kdGP4Go0kWKpN0o4LmzZ3bTRiXX8OdtE13zVXXdpM29nuR+2Sq9fU172zvXG8a+2/ShpPSKnO9iQW9I2sw23Qm2xGo55NPzi/fnYW+nLAM6odjLmAMQxuQjCb4/h/84aGZI9//kIU1lxy0gEOSi6+7/+lP//csLOl/Mwm42oEqw6/dC+ouqG8dQ9eeNfXaR2mA8qaP7wwctIG0LT4eCWj9SOpgxMaMi3KT7LV3t9XbDqmZzoTI2+PA1ZPEv/HjM5MjeZnwud2MbbuH0xj/6TvfqbyUE2+Gh5+/G/7mV7hWWB5xmdrz/j3ZF5addtZZZ0btxeeSDxKv666XrdGXj87QTKYPL4u4Cm50sw20mqGq4AptagzmKSgVQDI0g7VNu3HGhD5OL+qVA/Oa/UUtsRW5Ka7L/LapU7bqfut3Xh1VtU+YvaI744yfdC/d76WlIkizxQsXd4/Nf6yGhOzMw3g3751KZhYALX8gFwbJw1Fb79OhKZWXcg8P7Dt+OS4KEurxnJVxiy02i3Tbtjo7thjVKE2kNMnSwl8gEI/7oDlGe5/h6u2eAB5QCnI9qopGGmSvNvshJxI1Ecsvx9a0YQ3JxenLHtYZYyZwb+iFTp8xPRvgvbMW21D9e+6VdQwJNJIy2ZZgdBqQvd8MJy3OLpg2f9a5uinOZ1JfULZVErKeZErR0HmtTsCl0n4GTxdeYXbcacf8ZPOOmRqShaepKEKbJz41PcStB6ZFI/YGfw+e2Bm63jH6l0XSaW3UiuES19Y3AiBHLEcqqbksohiJR0XKLI7xbPEwAx4wGN/sIr4y3+ZkNJx14IGvqF4g9cRGA0guDiqTE5TBi2nU+eL5j3dL06szjRoT+JkwWsMA7OqwRI3X4uIwz2YumGJfMwt+OUYtm3OvB2052YhIaL43dbvuuhtqgfCcuFTsgjQxw0N77fXiqlsvq/i7+hXhZToEsBgHuAoBfMwHxj8JpOBsLZLSpAXBcw3U8jvaga1brozE4zpJ4srTQiAZcHegsTn+TAm80kAtROZ6MRH1nrgmDMVxwvKLmoWzLDMymBoaNH4JaGSkY3h4RiBDXC2V7aNVEr+zM5b3sixEuPKqy1NZszDnx3c2M/UybYXfx+czTyqtn10FHNQHNTMuYnhi1JZudqnDSDNh+cqhlhwiLkzl9Mxk80DG1uxoTXIBuIUb8rv66qurG22XaCu+Tzrp5Gpd3Bg6B9LbttK1FUevfs1BsR9Nge7XIUb/Bvj9dlHhbxhr/n/vVzKPik+J1NQI7r/PJAED2tkfQ6s3DBYmK5/ZHaMwOfXxQBnnB8SbZv4/l4deGAlU6pFUcoTpgKwDhJ6mGzEZSkrlrWsNSBrAAbbKPOlIHWAkfW320uxb+bVA/fsmqSmfvtOjtJn8GDC+8pUHliYyOoGWNqtZHo3Dj0gaqgteGY82gG4zGkNXLWgQu+yyS7ut8zMCGUJBPKT78IMPPljDSCQLAvdGaFpX6oiZtjUgRR6KsfhEJjXq9pJKCKanYq4WY1/L4zeiithFKuRwX5vb5dmEDGVsGTXou3xxs2fP7jbaYFKk120ZzrqlenHUnXeApkGQts4/zK8DT5s2rexHzmPvSeSmrpSXXUZiAF5Jg5QNQ0fGDjR1m5qpAAQhbNtNiG/LWB8pwavfA0/e2Qg5zy0P3GjDjaoshn6AMEQoGjV1BxIkEcDAnfwjb+osKuApo0XRzg4SpPLJrfJq4BJ7jb71XlTx2jnXvTRMvDzWCNhmaMpEEAiD0aMnFm+krJXtGTvlO5P5bbfN7EwSaAFdntUBcsY1Bh166KG1ypq3V6/Oyhy+LgEwZscLbtmV1t4Te2ER3DifGZWIg4H8YT1BLOLIbI1lkSbFaAyOVNCSEoeqdWZUIwZxffU1V3cfP/oT3cknntaN3K3fIE9LB+o2X2tOVJQNhQ3ai/8v+YkZv1eucej5cWewE0mjlZFemFyulrT8YjROpKwVUDyhGlI5c70IMyN8gWV1IHsSL0AZDBM5fk1BItVbVqvj/scr321h+HUDS3vnvoHRM2Bowbs66kV/XZdBiSr506SUYS0SjJnBfq1CSj8sbsUPP9iapNjymBQtcDgTPMPDM5JkmN2kmd9kVBHiVCGJegxgaF59zVW1ZI6YFrRE4lfBDThzYt6ToYl77n24B1yAReS+9rUHpUeaH+OKDUDFkUr3Zm+snuGkjbnpmc6clnfKj07pPvLhj2Rg/N3dj888KT98cGMAtVnZGlomVal3y6G47XbbZteem0vSkFbXX/+zar1aLWAphG/UlXOelT0YaderpCE3QkBj9qt3z7sQfDzXoSRvwNYC/pv2RSAMD88IZDLivLPTi4yJWz0LLZWt5qMCO4DaEYp5Q62TXWO2xJe//OVSV4BJZZF+gLpmYak00qmpNsYmNalXe/PNN2fV+KndNttu0934lZu6XXbbpXbn2TJ+nkXpPQICqcsolW7a9BndHrvs0c2aM7Py9Ex5fdt3SR4qUJ28Uy5njcgz9dDITDkGYs5fdNDKq45DwJOn+18W1Hf69OkVrcWXv/Koc9lnypV818zTfQM62ijf8Gfqo4G1UQbvGr+Gl6vla6qWuOzPpwriCYRGzZcbiqQOb3/724fuVp+eMcj00EwUBBYfMSsDM1UasVRm+LlVBCEwrI1xuWYvPV0QxzE8cKFYV2Ao6Zhj/kf33eOP7z4ciXbcN/8x+a0XG66f3uK7ekYkmV+gO/pjR9dg/tUnXFXSVhmrzJFfDUSeteeYJ2hEnonj+ktf+lIBV2dAh+fmbA43PhMR148aN0visXTt8SRJnjZYaU4byHvN0MrQaLfme/etzBpCazCeCXhgqEtnxzOmxkaZOKnjotfeQFOR82eVbTr0YM33Hj9VOfFh+7h31gw/L9fWfPsr3LPBfJAkGRgY6L4Tp5whHgzTEhth1iyUyhrYttLpmYYjjzyy8po3b25tnLLDzttmP4f3dpM32rTGI8cEaEAydcr0mtB3yFveEtV7XxzI/ydSqP+FNuVTVvOoMKlJBGd1MchOhasvxy8Vz/7QqAQGr9mmemLqZst1Q2LCU+Cmnrc/vmsoTnC95gEkGhd6toa25pk0JfU0VLYy2jJlHO7fliEujUBYnjrya43OLGFaRodLQAPfGhcTx7f+M4GAOeqoo54yyVpvUzA8N1svkSQIjUEWKVCXraCtRbU0mEb8++Uyw1LPRvjsZz/bfS771/rW6zL95W/+5m+7O26/o7vm2qtjc91QqmjhggB7ss2Jx+S7UdGZ16UXKU2TuK0xNNBRGzo25q8DnLQYLP6a4cbMl7PsTaeHPOI6ALCW55rx2/22225bJoYOynMZTIViM/HXCeoOUGMCNquOlNOzmsUbJzoXSAu/rA4W7pDqTxWeFZDp3b0tQxCcgXxWRLBeFEZgjJYpNMYB2ECknmVUWtqzEdgtZmEYFAca7gq/E7RXpI4JeiTLrFm3d6dlPcCPT/txqU2NQPkEZQT+du0szxkzZpSq+VXL6WebOacbaOXzdAwS77jjjqsfRxX3uQ52Fvez0Y0XztWzj2smVCjHOLeLMJxv9eAX/KGNeBR+obmTj/ynQ5g4GEk1GMO9DtfHH3/8YNwJgxmnG4yTrq7d58N1RMoNxm81GDtmMAAYPPPMMwfD4MpH+sWLFw0GfIORHHXIO3bOf7hPKxyMOq53rh1RWRUv/rrBgWkDg9lfazBSob6lDLHbBjMcNBiVMhiVMpiZGoMBzWB6nBUvqmXVdWypeqbcU6ZMGbzwwguLPsr6c8eyZYOR2vXMOSMDda/cUU0E2S89Yh8OfuITn/hP0/+ZJsjPaa8qW4CUaX6Ovryr7/vnv6we++2332CmBz1tkf5/AFLpLezJpTYAAAAASUVORK5CYII="/>
                        <div class="info-text">
                            <p>My Mondeo</p>
                        </div>
                    </div>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">预约经销商</p>
                    <div class="text-wrapper">
                        <p>{{dealerProfileMslResponse.dealerName}}</p>
                        <p>{{dealerProfileMslResponse.address}}</p>
                        <a href="tel:dealerInformation.phone">Call Dealer</a>
                    </div>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">订单信息</p>
                    <Input v-model="contactName" placeholder="" disabled disabled class="input-item">
                        <span slot="prepend" style="display:none"></span>
                        <span slot="append">{{customerMslResponse.name}}</span>
                    </Input>
                    <Input v-model="mobileNumber" placeholder=" " disabled class="input-item inputevenHook">
                        <span slot="prepend" style="display:none"></span>
                        <span slot="append">{{customerMslResponse.phone}}</span>
                    </Input>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">当前里程</p>
                    <Input v-model="currentMileage"   disabled placeholder="Enter your Odometer" class="input-item"></Input>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">服务类型</p>
                    <Input v-model="serviceType" class="textAreaSize" disabled placeholder="Any other service..."></Input>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">服务顾问</p>
                    <Input v-model="serviceConsultant" disabled class="textAreaSize" placeholder="Any other service..."></Input>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">注意事项</p>
                    <Input v-model="note" disabled class="textAreaSize" placeholder="Any other service..."></Input>
                </div>
                <div class="input-wrapper">
                    <p class="input-title">预约时间</p>
                    <Input v-model="appointmentTime" disabled class="textAreaSize" placeholder="Any other service..."></Input>
                </div>
                <transition name="fade">		
	                <div class="largeBtnWrapper" v-show = "orderBtnWrapper">
	                    <div class="btn-wrapper modifyOrder">
	                        <Button type="primary" style="margin-bottom:15px" class="largeBtn" @click="modifyOrderFn">修改订单</Button>
	                    </div>
	                    <div>
	                        <Button type="primary" style="margin-bottom:50px" class="largeBtn" @click="cancelOrderFn">取消订单</Button>
	                    </div>
	                </div>
	            </transition>
        </div>
	</div>

    <div class="orderConfirm" v-show = "orderConfirmStatus">
        <div class="messageInfoWrapper">
            <h2>您确定要取消订单吗？</h2>
            <p>点击“取消”按钮即可取消此订单。</p>
            <div class="largeBtnWrapper">
                <div class="btn-wrapper ">
                    <Button style="width:266px;height:55px;margin-bottom:10px" type="primary" class="largeBtn" @click = "cancelConfirm" v-bind:disabled="orderBtnActive">取消</Button>
                </div>
                <div class="modifyOrder">
                    <Button type="primary" style="width:266px;height:55px;border-color:#fff" class="largeBtn" @click="backConfirm">返回</Button>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import bar from '../components/bar'
import requestconfirmation from '../views/requestConfirmation'
export default {
    props: {},
	data () {
		return {
			vertical: 'apple',
			orderBtnWrapper: false,
			orderBtnActive: false,
			orderStatus: 'Ongoing Request',
			appointmentTimeAsDate: '2017-12-23T03:30:00.000Z',
			modifyOrderId: 'U3008828',
			dealerProfileMslResponse: {dealerName: '永达汽车销售有限公司', address: '上海市金沙江路1899号', phone: '021-88888888'},
			customerMslResponse: {name: 'Tom', phone: '17245678900'},
			contactName: '联系人姓名',
			mobileNumber: '手机号码',
			currentMileage: '65,000 km',
			serviceType: 'Maintenance',
			serviceConsultant: 'Others',
			note: '4888',
			appointmentTime: 'Thu,Mar 2 at 08:30',
			orderConfirmStatus: false
		}
    },
    components: {
		'bar': bar,
		'requestconfirmation': requestconfirmation
    },
	methods: {
		showServiceDetail () {
			console.log('ss')
		},
		modifyOrderFn () {
			this.$router.push({name: 'selectDealerOption'})
		},
		cancelOrderFn () {
            this.orderConfirmStatus = true
        },
        cancelConfirm () {
            this.orderConfirmStatus = false
   //          var u = navigator.userAgent
   //          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
   //          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
			// if (isAndroid) {
			// 	window.AppModel.postMessage(JSON.stringify({'message': 'gotoAppointmentList'}))
			// } else if (isiOS) {
			// 	window.webkit.messageHandlers.AppModel.postMessage({'message': 'gotoAppointmentList'})
			// }// 发版时把它调回来
			this.$router.push({name: 'myAppointment'})
			this.orderBtnActive = true// ajax 跑完之后要变成false
			// var orderSummaryUrl = 'https://servicebooking-service-qa.apps.cl-cn-east-preprod01.cf.ford.com/api/v1/bookings'
			// this.$http.post(orderSummaryUrl).then((response) => {
			// 	this.previewOrderSummaryStatus = false
			// 	response = JSON.parse(response.bodyText)
			// 	let showPostOverLay = true
			// 	this.$refs.requestconfirmationHook.showRequestConfirmationStatus(showPostOverLay, showAjaxStatus)
			// }, (response) => {
			// 	this.previewOrderSummaryStatus = falsess
			// 	let showPostOverLay = true
			// 	this.$refs.requestconfirmationHook.showRequestConfirmationStatus(showPostOverLay, !showAjaxStatus)
			// })
        },
        backConfirm () {
            this.orderConfirmStatus = false
        }
	},
	created () {
		let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
		_osbAuth['modifyOrderId'] = this.modifyOrderId
		window.localStorage.setItem('osb', JSON.stringify(_osbAuth))
		let orderT = this.appointmentTimeAsDate.split(':', 3)
		let orderTimeString = orderT[0].replace(/-/g, '/').replace(/T/g, ' ') + ':' + orderT[1] + ':00'
		let orderTime = new Date(orderTimeString)
		let todayTime = new Date()
		let intervalTtime = orderTime.getDate() - todayTime.getDate()
		if (intervalTtime && (this.orderStatus === 'Ongoing Request')) {
			this.orderBtnWrapper = true
		} else {
			this.orderBtnWrapper = false
		}
		this.currentMileage = _osbAuth.mileage
		this.serviceType = _osbAuth.selectServiceTypeParams.customer_serviceType
		this.serviceConsultant = _osbAuth.selectServiceTypeParams.customer_consultant
		this.note = _osbAuth.selectServiceTypeParams.customer_note
		this.appointmentTime = _osbAuth.selectDateAndTime.apptTime
		// this.orderBtnWrapper = this.onGoingStatus
		this.orderBtnActive = false
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .orderSummary .orderConfirm
        position:fixed
        top:0px
        width:100%
        height:100%
        left:0
        z-index:100
        overflow:auto
        backdrop-filter:blur
        background:rgba(7,17,27,0.8)
        .messageInfoWrapper
            position:absolute
            top:0
            left:0
            right:0
            bottom:0
            margin:auto
            padding:17px
            width:91.2%
            height:300px
            background:rgb(249,252,255)
            border-radius:18px
	.orderSummary .largeBtnWrapper
		margin-top:20px
		text-align:center
	.orderSummary .largeBtn
		width:90.1333%
		height 55px
	.orderSummary .inputevenHook .ivu-input
		border-top:none
	.orderSummary .ivu-input
		height:55px
		width: 100%
		padding-left:25px
		font-size:14px
		border-radius:0px
		border-left:none
		border-right:none
	.orderSummary .ivu-radio-group
		width:100%
	.orderSummary .ivu-radio-group-vertical .ivu-radio-wrapper
		height:55px
		line-height:55px
	.orderSummary .select-item
		position:relative
		width: 85.7333%
		height:55px
		margin:0 auto
		line-height:55px	
		border-bottom:1px solid #dddee1
	.orderSummary .radio-text
		position:absolute
		left:0px
	.orderSummary .ivu-radio
		position:absolute
		right:0px
		top:18px
	.orderSummary .ivu-input:hover
		border-top-color: #57a3f3
		border-bottom-color: #57a3f3
	.orderSummary .ivu-input-group-prepend
		display:none
	.orderSummary .ivu-input-group-append, .ivu-input-group-prepend
		background-color:#fff
		padding-right:16px
		font-size:14px
		color:rgb(149,149,149)
		border-right:none
		border-radius: 0px;
	.orderSummary .ivu-input[disabled]
		background-color: #fff;
		opacity: 1;
		cursor: not-allowed;
		color: #000;
	.orderSummary .ivu-btn-primary
		font-size:17px
		background:rgb(45,150,205)
		border-color:rgb(45,150,205)
	.orderSummary .modifyOrder .ivu-btn-primary
		font-size:17px
		color:rgb(45,150,205)
		background:#fff
		border-color:rgb(45,150,205)
	.orderSummary .inputevenHook .ivu-input-group-append
		border-top:0px
	.orderSummary textarea.ivu-input
		width:90.1333%
		border:1px solid #dddee1
		border-radius:4px
	.orderSummary .content-wrapper
		font-size:14px
		color:rgb(149,149,149)
	.orderSummary .bar-wrapper + .content-wrapper
		padding-top: 58px
	.orderSummary .server-type-detail
		position: absolute;
		left: 30%;
		top:2%
		width: 50px;
		font-size: 21px;
		color:rgb(45,150,205)
	.orderSummary .input-title
		height:50px
		font-size:14px
		color:rgb(149,149,149)
		line-height:50px
		background:rgb(249,252,255)
	.orderSummary .text-wrapper
		padding:27px 18px 18px 22px
		text-align:left
		border-top:1px solid #dddee1
		border-bottom:1px solid #dddee1
		&>p:first-child
			color: black
	.orderSummary .info
		display:flex
		padding:15px
		border-top:1px solid #dddee1
		border-bottom:1px solid #dddee1
		&>img
			margin-right:16px
		.info-text
			float:left
		&>.info-text p
			width:197px
			text-align:left
			height: 100%
			line-height: 43px
			color: black
	.orderSummary .radio-text
		font-size: 14px
	.orderSummary .btn-wrapper
		margin-top:17px
</style>