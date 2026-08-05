---
spec_id: admin/key-digital-systems-kd-mlv4x4pro-2588
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-MLV4x4Pro Control Spec"
manufacturer: "Key Digital"
model_family: KD-MLV4x4Pro
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-MLV4x4Pro
  firmware: "\"1.12\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.org
source_urls:
  - https://www.keydigital.org/web/content/175871/Manual_MLV4x4Pro_v1.0.pdf
  - https://www.keydigital.org
retrieved_at: 2026-07-13T06:29:14.410Z
last_checked_at: 2026-07-21T23:14:38.235Z
generated_at: 2026-07-21T23:14:38.235Z
firmware_coverage: "\"1.12\""
protocol_coverage: []
known_gaps:
  - "this spec covers only the documented command set; voltage/power specs, fault behavior, and firmware compatibility ranges are not stated in the source."
  - "source does not document a structured per-state query response schema"
  - "no continuously settable scalar variables documented beyond the"
  - "source documents no unsolicited notifications / push events."
  - "source documents no explicit multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "voltage/current/power specifications not stated in source."
  - "fault behavior / error recovery sequences not documented."
  - "firmware version compatibility range not stated (only current version 1.12 observed)."
  - "structured per-field query commands (e.g. individual power/routing queries) not documented; only aggregate STA."
  - "exact prompt/ack string returned after each command not specified."
verification:
  verdict: verified
  checked_at: 2026-07-21T23:14:38.235Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec commands matched verbatim in source HELP output; transport parameters verified; complete coverage of documented command set. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Key Digital Systems KD-MLV4x4Pro Control Spec

## Summary
The Key Digital Systems KD-MLV4x4Pro is a 4x4 HDBaseT/HDMI matrix switcher with multiview, analog/optical/HDMI audio breakout, EDID management, and IR extension. It is controlled bi-directionally over RS-232 (57,600 baud) or a raw TCP/IP socket (default port 23). Commands are ASCII mnemonics terminated with a carriage return and are not case-sensitive.

<!-- UNRESOLVED: this spec covers only the documented command set; voltage/power specs, fault behavior, and firmware compatibility ranges are not stated in the source. -->

## Transport
```yaml
# Source documents BOTH RS-232 and TCP/IP control over a shared command API.
protocols:
  - tcp
  - serial
addressing:
  # Default static IP is device-specific (192.168.1.239 out of box); configurable.
  host: 192.168.1.239  # default static IP per source
  port: 23
  # NOTE: source says use Raw / Other service, NOT Telnet, despite port 23.
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Service USB port also usable as RS-232 control port at 115,200 baud
  # (registers as "Prolific USB-to-Serial Comm Port").
auth:
  type: none  # inferred: no login/password procedure for TCP/RS-232 control in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: PN / PF power commands present
  - routable    # inferred: SPO SB/SI/SA input-output routing commands present
  - queryable   # inferred: STA status, H help, and RN read-name queries present
```

## Actions
```yaml
# All commands require a Carriage Return (CR, \r) terminator.
# Commands are NOT case-sensitive. Spaces shown in source are for clarity only;
# real command strings contain NO spaces. After each command a prompt is returned.
# Parameter ranges documented in source:
#   input/output index xx,yy = 01-04 (zero-padded, 2 digits); A = All (outputs only)
#   multiview input = 05 also valid for SPO routing (multiview source)
actions:
  - id: help
    label: Help
    kind: query
    command: "H"
    params: []
    notes: Returns entire API in readable format.
  - id: status
    label: Show Global System Status
    kind: query
    command: "STA"
    params: []
    notes: Returns unit status and settings (model, firmware, network, routing, audio, IR, multiview).
  - id: power_on
    label: Power On
    kind: action
    command: "PN"
    params: []
  - id: power_off
    label: Power Off
    kind: action
    command: "PF"
    params: []
  - id: set_input_link
    label: Set Input ON/OFF
    kind: action
    command: "SPI{input}{state}"
    params:
      - name: input
        type: string
        description: "Input index, zero-padded (01-04)"
      - name: state
        type: enum
        values: [ON, OFF]
        description: Enable/disable input link
  - id: set_input_osd
    label: Set Input OSD ON/OFF
    kind: action
    command: "SPI{input}OSD{state}"
    params:
      - name: input
        type: string
        description: "Input index, zero-padded (01-04)"
      - name: state
        type: enum
        values: [ON, OFF]
  - id: set_input_osd_position
    label: Display Input Name at X/Y-axis
    kind: action
    command: "SPI{input}OSP{x}.{y}"
    params:
      - name: input
        type: string
        description: "Input index, zero-padded (01-04)"
      - name: x
        type: string
        description: "X-axis, aaaa=[0001~3840] (4 digits)"
      - name: y
        type: string
        description: "Y-axis, bbbb=[0001~2060] (4 digits)"
  - id: set_input_osd_font_size
    label: Set Input OSD Font Size
    kind: action
    command: "SPI{input}OSS{size}"
    params:
      - name: input
        type: string
        description: "Input index, zero-padded (01-04)"
      - name: size
        type: enum
        values: ["1", "2", "3"]
        description: "1=12x24px, 2=24x48px, 3=48x96px"
  - id: set_video_output_input
    label: Set Video Output to Input
    kind: action
    command: "SPO{output}SB{input}"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04, A=All)"
      - name: input
        type: string
        description: "Input index, zero-padded (01-04, 05=multiview)"
  - id: set_video_audio_output_input
    label: Set Video-Audio Output to Input
    kind: action
    command: "SPO{output}SI{input}"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04, A=All)"
      - name: input
        type: string
        description: "Input index, zero-padded (01-04, 05=multiview)"
  - id: set_video_output_pattern
    label: Set Video Output Test Pattern
    kind: action
    command: "SPO{output}PG{pattern}"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04, A=All)"
      - name: pattern
        type: enum
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        description: "0=OFF, 1=Black Screen, 2=Horiz Gray Bars, 3=Horiz Gray Scale, 4=Vert Gray Scale, 5=Color Bars, 6=Red, 7=Green, 8=Blue, 9=Grid"
  - id: set_video_output_format
    label: Set Video Output Format
    kind: action
    command: "SPO{output}VF{format}"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04, A=All)"
      - name: format
        type: enum
        values: ["01", "02", "03"]
        description: "01=4K@30, 02=1080p@60, 03=720p@60"
  - id: set_video_output_debug
    label: Set Video Output Debug Mode
    kind: action
    command: "SPO{output}DBG{state}"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04, A=All)"
      - name: state
        type: enum
        values: [ON, OFF]
  - id: set_audio_output_input
    label: Set Audio Output to Input
    kind: action
    command: "SPO{output}SA{input}"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04, A=All)"
      - name: input
        type: string
        description: "Input index, zero-padded (01-04)"
  - id: set_hdmi_audio_enable
    label: Set HDMI/UHDoTP Audio Output Enable/Disable
    kind: action
    command: "SPO{output}HA{state}"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04, A=All)"
      - name: state
        type: enum
        values: [E, D]
        description: "E=Enable, D=Disable"
  - id: set_balanced_audio_enable
    label: Set Balanced Audio Output Enable/Disable
    kind: action
    command: "SPO{output}AA{state}"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04, A=All)"
      - name: state
        type: enum
        values: [E, D]
        description: "E=Enable, D=Disable"
  - id: set_optical_audio_enable
    label: Set Optical Audio Output Enable/Disable
    kind: action
    command: "SPO{output}DA{state}"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04, A=All)"
      - name: state
        type: enum
        values: [E, D]
        description: "E=Enable, D=Disable"
  - id: set_output_ir_direction
    label: Set Output IR Direction
    kind: action
    command: "SPO{output}IRS{direction}"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04, A=All)"
      - name: direction
        type: enum
        values: ["1", "2"]
        description: "1=IN, 2=OUT"
  - id: set_multiview_audio_input
    label: Set Audio Input on Multiview
    kind: action
    command: "SPMAS{input}"
    params:
      - name: input
        type: string
        description: "Input index, zero-padded (01-04)"
  - id: set_multiview_audio_output_enable
    label: Set Multiview Audio Output Enable/Disable
    kind: action
    command: "SPMA{state}"
    params:
      - name: state
        type: enum
        values: [E, D]
        description: "E=Enable, D=Disable"
  - id: set_multiview_audio_delay
    label: Set Multiview Audio Delay
    kind: action
    command: "SPMAD{delay}"
    params:
      - name: delay
        type: string
        description: "Audio delay in ms, zzz=[000~255] (3 digits)"
  - id: set_multiview_input_swap
    label: Set Multiview Input Swap
    kind: action
    command: "SPMVIS"
    params: []
  - id: set_multiview_mode_preset
    label: Set Multiview Mode by Preset
    kind: action
    command: "SPMVSM{preset}"
    params:
      - name: preset
        type: enum
        values: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
        description: "1=QUAD, 2=UP, 3=DOWN, 4=LEFT, 5=RIGHT, 6~9=MANUAL1~4"
  - id: set_multiview_input_xy
    label: Set Multiview Input X/Y Start and End
    kind: action
    command: "SPM{input}XY{sx}.{sy}.{ex}.{ey}"
    params:
      - name: input
        type: string
        description: "Input index, zero-padded (01-04)"
      - name: sx
        type: string
        description: "Start X, aaaa=[0000~3839] (4 digits)"
      - name: sy
        type: string
        description: "Start Y, bbbb=[0000~2159] (4 digits)"
      - name: ex
        type: string
        description: "End X, cccc=[0000~3839] (4 digits)"
      - name: ey
        type: string
        description: "End Y, dddd=[0000~2159] (4 digits)"
  - id: set_multiview_border_width
    label: Set Multiview Border Line Width
    kind: action
    command: "SPMBLW{width}"
    params:
      - name: width
        type: enum
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        description: "0=None, 1~9 = pixel width"
  - id: set_multiview_border_color
    label: Set Multiview Border Line Color
    kind: action
    command: "SPMBLC{r}.{g}.{b}"
    params:
      - name: r
        type: string
        description: "Red, rrr=[000~255] (3 digits)"
      - name: g
        type: string
        description: "Green, ggg=[000~255] (3 digits)"
      - name: b
        type: string
        description: "Blue, bbb=[000~255] (3 digits)"
  - id: set_multiview_priority
    label: Set Multiview Input Priority
    kind: action
    command: "SPMPT{order}"
    params:
      - name: order
        type: string
        description: "Priority order abcd=[1234~4321] (permutation of input 1-4)"
  - id: save_multiview_screen_preset
    label: Save User Multiview Screen to Preset
    kind: action
    command: "SPMVSS{preset}"
    params:
      - name: preset
        type: enum
        values: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  - id: write_input_name
    label: Write Input Name
    kind: action
    command: "SPI{input}WN{name}"
    params:
      - name: input
        type: string
        description: "Input index, zero-padded (01-04)"
      - name: name
        type: string
        description: "Name, max 16 characters"
  - id: read_input_name
    label: Read Input Name
    kind: query
    command: "SPI{input}RN"
    params:
      - name: input
        type: string
        description: "Input index, zero-padded (01-04)"
  - id: write_output_name
    label: Write Output Name
    kind: action
    command: "SPO{output}WN{name}"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04)"
      - name: name
        type: string
        description: "Name, max 16 characters"
  - id: read_output_name
    label: Read Output Name
    kind: query
    command: "SPO{output}RN"
    params:
      - name: output
        type: string
        description: "Output index, zero-padded (01-04)"
  - id: write_device_name
    label: Write Device Name
    kind: action
    command: "SPCWN{name}"
    params:
      - name: name
        type: string
        description: "Name, max 16 characters"
  - id: read_device_name
    label: Read Device Name
    kind: query
    command: "SPCRN"
    params: []
  - id: set_host_ip
    label: Set Host IP Address
    kind: action
    command: "SPCETIPA{ip}"
    params:
      - name: ip
        type: string
        description: "IP address, xxx.xxx.xxx.xxx (each octet 000-255)"
  - id: set_net_mask
    label: Set Net Mask
    kind: action
    command: "SPCETIPM{mask}"
    params:
      - name: mask
        type: string
        description: "Net mask, xxx.xxx.xxx.xxx"
  - id: set_route_ip
    label: Set Route IP Address (Gateway)
    kind: action
    command: "SPCETIPR{gateway}"
    params:
      - name: gateway
        type: string
        description: "Router/gateway IP, xxx.xxx.xxx.xxx"
  - id: set_tcp_port
    label: Set TCP/IP Port
    kind: action
    command: "SPCETIPP{port}"
    params:
      - name: port
        type: string
        description: "TCP/IP port, zzzz=[0001~9999] (4 digits)"
  - id: apply_network_config
    label: Apply New Network Config
    kind: action
    command: "SPCETIPB"
    params: []
  - id: copy_edid_from_hdmi
    label: Copy EDID from HDMI Output to Input
    kind: action
    command: "SPCEDID{input}H{output}"
    params:
      - name: input
        type: string
        description: "Input index, zero-padded (01-04, A=All)"
      - name: output
        type: string
        description: "HDMI output index, zero-padded (01-04)"
  - id: copy_edid_from_uhdotp
    label: Copy EDID from UHDoTP Output to Input
    kind: action
    command: "SPCEDID{input}C{output}"
    params:
      - name: input
        type: string
        description: "Input index, zero-padded (01-04, A=All)"
      - name: output
        type: string
        description: "UHDoTP output index, zero-padded (01-04)"
  - id: copy_edid_from_default
    label: Copy EDID from Default EDID to Input
    kind: action
    command: "SPCEDID{input}D{edid}"
    params:
      - name: input
        type: string
        description: "Input index, zero-padded (01-04, A=All)"
      - name: edid
        type: enum
        values: ["01", "02", "03", "04", "05", "06", "07", "08"]
        description: "01=HDMI1080i60 2CH PCM, 02=HDMI1080i60 PCM/DTS/DOLBY, 03=HDMI1080p60 2CH PCM, 04=HDMI1080p60 PCM/DTS/DOLBY, 05=HDMI4Kx2K60/10G 2CH PCM, 06=HDMI4Kx2K60/10G PCM/DTS/DOLBY, 07=DVI1280x72060 NoAudio, 08=DVI1920x108060 NoAudio"
  - id: set_front_panel_buttons
    label: Set Front Panel Buttons Enable/Disable
    kind: action
    command: "SPCFB{state}"
    params:
      - name: state
        type: enum
        values: [E, D]
        description: "E=Enable, D=Disable"
  - id: set_front_lcd_backlight
    label: Set Front LCD Backlight and LEDs ON/OFF
    kind: action
    command: "SPCFD{state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]
  - id: set_rs232_baud_rate
    label: Set Main RS232 Baud Rate
    kind: action
    command: "SPCRSB{rate}"
    params:
      - name: rate
        type: enum
        values: ["0", "1", "2", "3", "4"]
        description: "0=57600, 1=38400, 2=19200, 3=9600, 4=4800 bps"
  - id: factory_reset_all
    label: Factory Reset All Settings
    kind: action
    command: "SPCDF"
    params: []
  - id: factory_reset_except_network
    label: Factory Reset All Except Network/Naming
    kind: action
    command: "SPCDF00"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: string
    description: After a new command is received, a prompt is sent back (acknowledgement).
  - id: help_response
    type: string
    description: Full API listing returned by the H command.
  - id: status_response
    type: string
    description: Unit status block returned by the STA command (model, firmware, network, routing, audio, IR, multiview).
  - id: input_name_response
    type: string
    description: Name string returned by SPI{input}RN.
  - id: output_name_response
    type: string
    description: Name string returned by SPO{output}RN.
  - id: device_name_response
    type: string
    description: Name string returned by SPCRN.
# UNRESOLVED: source does not document a structured per-state query response schema
# (e.g. individual power/routing query commands). Only STA aggregates status.
```

## Variables
```yaml
# UNRESOLVED: no continuously settable scalar variables documented beyond the
# discrete actions above. Audio delay (SPM AD), baud rate (SPC RSB), TCP port
# (SPCETIPP), and EDID selection are captured as discrete actions.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications / push events.
# The only device-originated output is the prompt returned after each command.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Factory-reset commands (SPCDF, SPCDF00)
# and network-configuration commands (SPCETIP*) are destructive/disruptive but
# carry no documented confirmation protocol.
```

## Notes
- Commands are **not case-sensitive**; spaces in the documentation are for clarity only — real command strings contain **no spaces** (e.g. `SPO01SI02`, not `SPO 01 SI 02`).
- A **Carriage Return (`\r`) is required at the end of each command string**.
- After each command the device returns a prompt.
- TCP/IP: use a **Raw / Other socket** connection, **not Telnet**, despite the default port 23. Only **one TCP/IP socket** is supported at a time, but simultaneous TCP + web sockets and multiple web sockets are supported.
- Default static IP `192.168.1.239`; default TCP port `23`. Both configurable via `SPCETIP*` commands followed by `SPCETIPB` to apply.
- RS-232 default **57,600 baud** (8N1, no flow control). Baud rate is reconfigurable via `SPC RSB`. The Service USB port may also be used as an RS-232 control port at **115,200 baud**.
- Input/output indices are **zero-padded two digits** (`01`-`04`). `A` = All for output-scoped commands. `05` selects the multiview source on video/audio routing commands.
- Multiview audio delay (`SPM AD`) applies to both analog and digital ports of the output; up to 255 ms per output.
- IR ports are **not routable** — each IR In/Out corresponds to its respective Rx unit. Max supported IR burst frequency is 55 kHz. IR input supports serial IR only (no IR sensor); RS-232 extension is not supported over IR ports.
- Web UI is reachable at the device IP; default password is **`admin`** (adjustable in network settings). This is a separate management interface from the TCP/RS-232 control API and is not covered by this spec's auth block.
- Firmware version observed in HELP/STATUS output: **1.12**.

<!-- UNRESOLVED: voltage/current/power specifications not stated in source. -->
<!-- UNRESOLVED: fault behavior / error recovery sequences not documented. -->
<!-- UNRESOLVED: firmware version compatibility range not stated (only current version 1.12 observed). -->
<!-- UNRESOLVED: structured per-field query commands (e.g. individual power/routing queries) not documented; only aggregate STA. -->
<!-- UNRESOLVED: exact prompt/ack string returned after each command not specified. -->

## Provenance

```yaml
source_domains:
  - keydigital.org
source_urls:
  - https://www.keydigital.org/web/content/175871/Manual_MLV4x4Pro_v1.0.pdf
  - https://www.keydigital.org
retrieved_at: 2026-07-13T06:29:14.410Z
last_checked_at: 2026-07-21T23:14:38.235Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:14:38.235Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec commands matched verbatim in source HELP output; transport parameters verified; complete coverage of documented command set. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "this spec covers only the documented command set; voltage/power specs, fault behavior, and firmware compatibility ranges are not stated in the source."
- "source does not document a structured per-state query response schema"
- "no continuously settable scalar variables documented beyond the"
- "source documents no unsolicited notifications / push events."
- "source documents no explicit multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "voltage/current/power specifications not stated in source."
- "fault behavior / error recovery sequences not documented."
- "firmware version compatibility range not stated (only current version 1.12 observed)."
- "structured per-field query commands (e.g. individual power/routing queries) not documented; only aggregate STA."
- "exact prompt/ack string returned after each command not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
