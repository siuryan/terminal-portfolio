import * as React from "react";
import styled from "styled-components";

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import "../node_modules/xterm/css/xterm.css";

const StyledTerminalDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  background: black;
  font-size: large;
`;

class ReactTerminal extends React.Component {

    commandOutput = {
        "help": "this is a test",
    };

    constructor(props) {
        super(props);
        this.state = {
            command: ""
        };
    }

    componentDidMount() {
        const term = new Terminal({
            theme: {
                // selection: "#00FF00"
            },
            fontSize: 20,
        });
        term.prompt = () => {
            term.write("$ ");
        }
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        // Open the terminal in #terminal-container
        term.open(document.getElementById('terminal'));

        // Make the terminal's size and geometry fit the size of #terminal-container
        fitAddon.fit();

        // make terminal text color green
        term.write("\x1b[1;32m");

        term.writeln("Hello there... type `help` to get started.\r\n");
        term.prompt();

        term.onData(data => {
            if (data.charCodeAt(0) === 13) {
                // enter
                if (this.state.command) {
                    if (this.state.command in this.commandOutput) {
                        term.write("\r\n");
                        term.write(this.commandOutput[this.state.command]);
                    } else {
                        term.write("\r\n");
                        term.write("Invalid command. Type `help` to get started.");
                    }
                }
                this.setState({command: ""});
                term.write("\r\n\r\n");
                term.prompt();
            } else if (data.charCodeAt(0) === 127) {
                // backspace
                if (this.state.command) {
                    this.setState({
                        command: this.state.command.substring(0, this.state.command.length - 1)
                    });
                    term.write("\b \b");
                }
            } else {
                this.setState({command: this.state.command + data});
                term.write(data);
            }
        });
    }

    render() {
        return (
            <div>
                <script src="../node_modules/xterm/lib/xterm.js"></script>
                <StyledTerminalDiv id="terminal">
                </StyledTerminalDiv>
            </div>
        )
    }
}

export default ReactTerminal
