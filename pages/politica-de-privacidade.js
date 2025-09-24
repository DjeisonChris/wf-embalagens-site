// pages/politica-de-privacidade.js
import Link from 'next/link';

const PoliticaDePrivacidadePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center py-16 bg-white">
            <div className="w-full container mx-auto max-w-4xl px-4 prose lg:prose-xl">
                <h1>Política de Privacidade</h1>
                <p><strong>Última atualização:</strong> 18 de setembro de 2025</p>
                
                <h2>1. Introdução</h2>
                <p>
                    A WF Embalagens ("nós", "nosso") opera o site {' '}
                    {/* LINK CORRIGIDO AQUI */}
                    <Link href="/" className="text-brand-red underline hover:text-brand-red-dark">
                        wfembalagens.com.br
                    </Link>
                    {' '} (o "Serviço"). 
                    Esta página informa sobre nossas políticas relativas à coleta, uso e divulgação de dados pessoais quando você utiliza nosso Serviço e as opções que você tem em relação a esses dados, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                </p>

                <h2>2. Coleta de Dados</h2>
                <p>
                    Coletamos as informações que você nos fornece diretamente através dos nossos formulários de Contato e Orçamento. Os dados coletados podem incluir:
                </p>
                <ul>
                    <li>Nome</li>
                    <li>Endereço de e-mail</li>
                    <li>Número de telefone</li>
                    <li>Nome da empresa</li>
                    <li>Qualquer outra informação que você forneça nos campos de mensagem.</li>
                </ul>

                <h2>3. Uso dos Seus Dados</h2>
                <p>A WF Embalagens utiliza os dados coletados para diversas finalidades:</p>
                <ul>
                    <li>Para fornecer e manter nosso Serviço;</li>
                    <li>Para responder às suas solicitações de orçamento e contato;</li>
                    <li>Para fornecer suporte ao cliente;</li>
                    <li>Para enviar comunicações de marketing e promoções, caso você opte por recebê-las. Você pode optar por não receber estas comunicações a qualquer momento.</li>
                </ul>

                <h2>4. Uso de Cookies e Ferramentas de Análise</h2>
                <p>
                    Nosso site utiliza cookies e tecnologias de rastreamento para monitorar a atividade em nosso Serviço e guardar certas informações. Cookies são pequenos arquivos de dados salvos no seu dispositivo.
                </p>
                <p>
                    Pretendemos usar o <strong>Google Analytics</strong>, um serviço de análise web oferecido pelo Google que rastreia e relata o tráfego do site. O Google usa os dados coletados para rastrear e monitorar o uso do nosso Serviço. Estes dados são compartilhados com outros serviços do Google. Para mais informações sobre as práticas de privacidade do Google, você pode visitar a página de Política de Privacidade do Google.
                </p>

                <h2>5. Armazenamento e Retenção dos Dados</h2>
                <p>
                    As informações fornecidas por você são transferidas e armazenadas em uma planilha de clientes interna. Reteremos seus dados pessoais apenas pelo tempo necessário para os fins estabelecidos nesta Política de Privacidade, ou seja, enquanto você for um cliente ativo ou tivermos uma obrigação legal de mantê-los.
                </p>

                <h2>6. Compartilhamento de Dados</h2>
                <p>
                    A WF Embalagens **não compartilha** suas informações pessoais com terceiros, exceto quando exigido por lei.
                </p>
                
                <h2>7. Segurança dos Dados</h2>
                <p>
                    A segurança dos seus dados é importante para nós, mas lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus Dados Pessoais, não podemos garantir sua segurança absoluta.
                </p>

                <h2>8. Seus Direitos de Proteção de Dados (LGPD)</h2>
                <p>
                    Você tem o direito de acessar, corrigir, atualizar ou solicitar a exclusão de suas informações pessoais. Se você deseja exercer algum desses direitos, entre em contato conosco através do e-mail fornecido abaixo.
                </p>
                
                <h2>9. Alterações a Esta Política de Privacidade</h2>
                <p>
                    Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações, publicando a nova Política de Privacidade nesta página e atualizando a data da "última atualização" no topo.
                </p>

                <h2>10. Contato</h2>
                <p>
                    Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:
                </p>
                <ul>
                    <li>Por e-mail: <strong>wfembalagens@yahoo.com</strong></li>
                </ul>
            </div>
        </main>
    );
};

export default PoliticaDePrivacidadePage;