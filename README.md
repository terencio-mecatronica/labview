# Sistema de Monitoramento Biomecânico Mandibular com Sensor Magnético AS5600

![Badge em Desenvolvimento](https://img.shields.io/badge/Status-Concluído-green)
![Badge LabVIEW](https://img.shields.io/badge/Software-LabVIEW-yellow)
![Badge ESP32](https://img.shields.io/badge/Hardware-ESP32-blue)

## 📋 Sobre o Projeto

A análise biomecânica da mandíbula é fundamental para o diagnóstico de disfunções temporomandibulares (DTM) e planejamento de reabilitações orais. No entanto, métodos tradicionais muitas vezes carecem de precisão ou envolvem alto custo.

Este projeto consiste em uma plataforma de instrumentação virtual para analisar o movimento da articulação temporomandibular (ATM). O sistema integra o microcontrolador **ESP32** e o sensor magnético de alta precisão **AS5600** com o software **LabVIEW**.

O dispositivo permite capturar, processar e registrar o movimento mandibular em tempo real, convertendo deslocamentos angulares em grandezas lineares, velocidade e aceleração, oferecendo uma abordagem não invasiva e acessível para aplicações de engenharia e diagnósticos clínicos.

## 🎯 Objetivos

O objetivo principal é desenvolver um sistema de instrumentação virtual de baixo custo para o monitoramento cinemático da ATM em tempo real.

**Objetivos Específicos:**
* **Hardware:** Instrumentação com sensor AS5600 (I2C) e ESP32 via comunicação Serial.
* **Algoritmos:** Conversão matemática de angular para linear e cálculo de derivadas (velocidade e aceleração).
* **Interface (IHM):** Visualização em gráficos de forma de onda e animação 3D sincronizada.
* **Datalogging:** Registro automático de dados em `.csv` para pós-análise.

## ✨ Funcionalidades

* **Sensor Sem Contato:** Utiliza codificador magnético absoluto, evitando desgaste físico.
* **Comunicação Serial:** Transmissão de dados via USB (UART) de alta velocidade.
* **Processamento em Tempo Real:** Filtragem e conversão matemática instantânea.
* **Animação 3D:** *Picture Ring* no LabVIEW sincronizado frame-a-frame com o sensor.
* **Parametrização:** Ajuste dinâmico do "Raio da Mandíbula" para diferentes pacientes (adultos/crianças).

## 🛠️ Especificações Técnicas

### Hardware

![AS5600](ESP32.jpeg)

| Parâmetro | Especificação |
| :--- | :--- |
| **Microcontrolador** | ESP32 (Espressif Systems) - Dual Core 240MHz |
| **Sensor de Posição** | AS5600 (AMS) - Encoder Magnético 12-bits |
| **Resolução** | 0.0879 graus (4096 posições) |
| **Protocolo** | I2C (Inter-Integrated Circuit) |
| **Tensão** | 3.3V DC |
| **Taxa de Amostragem** | Configurável (Serial Baud Rate: 115200) |


### Pinagem (Conexões ESP32)

* **VCC:** 3.3V
* **GND:** GND
* **SDA (Dados):** GPIO 21
* **SCL (Clock):** GPIO 22

## 📐 Lógica Matemática e Física

O sistema converte o deslocamento angular ($\theta$) lido pelo sensor em deslocamento linear do arco mandibular ($S$), baseado no raio ($R$) configurado pelo usuário:

$$S = \theta_{(rad)} \times R_{(cm)}$$

Além da posição, o sistema calcula as derivadas físicas para análise clínica:
1.  **Velocidade ($v$):** $\frac{ds}{dt}$ (cm/s)
2.  **Aceleração ($a$):** $\frac{d^2s}{dt^2}$ (cm/s²) - Permite identificar picos de força e tremores.

## 💻 Interface do Usuário (LabVIEW)

### Painel Frontal
O painel permite a visualização da simulação 3D e dos gráficos de cinemática (Abertura, Velocidade e Aceleração).

![Painel Frontal LabVIEW](Front%20Panel.png)

### Diagrama de Blocos
Lógica de programação G-Code demonstrando aquisição VISA, processamento matemático e escrita de arquivos.

![Diagrama de Blocos](Diagram Block.png)

### 📈 Curvas Típicas de Operação

O sistema é capaz de capturar detalhadamente a cinemática do movimento mandibular. Abaixo, apresenta-se a resposta típica do sistema durante um ciclo completo de abertura e fechamento.

![Gráfico da Abertura Linar](Gráfico%20da%20Abertura%20Linear.png)
![Gráfico da Abertura Linar](Gráfico%20da%20Aceleracao.png)
![Gráfico da Abertura Linar](Gráfico%20da%20Velocidade.png)

**Análise dos Gráficos:**
1.  **Abertura (Posição):** Observa-se o movimento linear suave de abertura até o pico máximo e o retorno à posição de repouso.
2.  **Velocidade:** Apresenta patamares constantes durante o movimento contínuo, indicando estabilidade na execução.
3.  **Aceleração:** O gráfico exibe picos característicos ("spikes") nos momentos de início e fim do movimento. Estes impulsos correspondem fisicamente à quebra de inércia e à inversão do sentido do movimento, validando a precisão da derivada numérica calculada pelo algoritmo.

## 📂 Códigos Fonte e Execução

Os códigos fonte completo do projeto está disponível no arquivo `.vi` (LabVIEW) neste repositório e no arquivo  `.cpp` (Python).

**Arquivo Principal:** `as56007.vi`
**Arquivo Principal:** `as56007.cpp`

### Pré-requisitos
Para executar o software, você precisará de:
* **LabVIEW**.
* **VS Code ou qualquer compilador**.

### Como utilizar LabVIEW
1.  Faça o download do arquivo `.vi`.
2.  Conecte o hardware (ESP32) à porta USB.
3.  Abra o arquivo no LabVIEW.
4.  No painel frontal, selecione a **Porta COM** correta no menu "VISA resource name".
5.  Clique na seta branca **Run** (Executar) na barra superior.

### Como utilizar ESP32
1.  Faça o download do arquivo `.cpp`.
2.  Abra o compilador.
3.  Realize o upload do código.
4.  Se abrir o monitor, feche o compilador antes de executar no LabVIEW.

## ☁️ Integração IoT com Google Sheets

O projeto implementa uma arquitetura IoT completa, permitindo que o LabVIEW envie dados diretamente para a nuvem. Foram desenvolvidos dois scripts em **Google Apps Script** para gerenciar esse fluxo.

Os arquivos estão disponíveis na pasta `scripts` deste repositório:

### 1. Engine de Integração (`script1.gs`)
* **Função:** Atua como o **Web App Principal (API)**.
* **Lógica Híbrida:** Este script centraliza toda a comunicação externa. Ele é capaz de interpretar diferentes comandos enviados pelo LabVIEW via parâmetros URL:
    * `acao=criar`: Cria uma nova aba na planilha com o nome do paciente, garantindo que os dados não se misturem.
    * `acao=gravar`: Recebe os dados de telemetria (Tempo, Abertura, Velocidade, Aceleração) e os insere na próxima linha vazia (*appendRow*) da aba correspondente.
* **Configuração:** Deve ser implantado como Web App ("Executar como eu", "Acesso: Qualquer pessoa") para gerar a URL de integração usada no LabVIEW.

### 2. Ferramenta de Reset (`script2.gs`)
* **Função:** Script utilitário para **Limpeza de Dados**.
* **Utilidade:** Permite ao operador limpar instantaneamente os dados de um ensaio anterior na planilha ativa, preservando cabeçalhos e gráficos.
* **Uso:** Ideal para a fase de testes e calibração, acionado por um botão "Limpar" desenhado na própria interface do Google Sheets.

---

### ⚙️ Como Configurar (Deploy)

Para conectar o LabVIEW à planilha:

1.  Abra o arquivo `script1.gs` no editor de scripts do Google Sheets.
2.  Clique em **Implantar** > **Nova implantação**.
3.  Selecione tipo **"App da Web"**.
4.  Defina o acesso como **"Qualquer pessoa"**.
5.  Copie a **URL gerada** e cole no bloco de configuração do LabVIEW (Diagrama de Blocos).

### 🔘 Configuração do Botão de Limpeza (Script 2)

Diferente do Script 1, o **Script de Limpeza** não precisa ser publicado como Web App. Ele roda localmente dentro da planilha através de um botão desenhado na interface.

**Passo a passo para criar o botão:**

1.  No Google Sheets, vá no menu **Inserir** > **Desenho**.
2.  Utilize as ferramentas de forma para desenhar um botão (ex: um retângulo escrito "LIMPAR").
3.  Clique em **Salvar e Fechar**. O desenho aparecerá na planilha.
4.  Clique no desenho (se necessário, clique com o botão direito para selecionar).
5.  Clique nos **três pontinhos verticais** no canto do desenho e selecione **Transferir script** (ou *Assign script*).
6.  Digite o nome exato da função que está dentro do arquivo `script2.gs` (ex: `limparDados`) e clique em OK.

**Nota:** Na primeira vez que você clicar no botão, o Google pedirá permissão para executar o script. Basta autorizar e o botão funcionará sempre que clicado.

## ✅ Conclusão

O projeto resultou em um sistema funcional e estável. A utilização do LabVIEW possibilitou a visualização em tempo real e o tratamento matemático complexo dos sinais. O hardware demonstrou estabilidade na leitura angular sem contato, eliminando ruídos mecânicos. O sistema entrega uma solução completa, desde a captura física até a geração de relatórios CSV.

## 👥 Autores

* **Gabriela Benedito Jose dos Santos Moreira**
* **Terencio Francisco Lira Ribeiro**

**Instituição:** Instituto Federal de Educação, Ciência e Tecnologia do Sudeste de Minas Gerais - Campus Juiz de Fora.
**Curso:** Engenharia Mecatrônica.

---
*Este projeto foi desenvolvido como parte da disciplina de Instrumentação II (2025-2).*
