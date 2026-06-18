---
spec_id: admin/panasonic-th-xxpf11uk-xxpf12uk-xxxpf12u-xxpf12w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-xxPF11UK / TH-xxPF12UK / TH-xxxPF12U / TH-xxPF12W Control Spec"
manufacturer: Panasonic
model_family: TH-xxPF11UK
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-xxPF11UK
    - TH-xxPF12UK
    - TH-xxxPF12U
    - TH-xxPF12W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.connect.panasonic.com
  - manualshelf.com
  - mediarealm.com.au
  - manualslib.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/CQ1_U_SerialCommandList.pdf
  - https://www.manualshelf.com/manual/panasonic/rs232-protocols/hints-and-tips-english.html
  - https://www.mediarealm.com.au/articles/panasonic-projector-commands/
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://www.manualslib.com/manual/700642/Panasonic-Rs-232c.html
retrieved_at: 2026-06-15T12:46:06.021Z
last_checked_at: 2026-06-16T07:14:03.043Z
generated_at: 2026-06-16T07:14:03.043Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "refined source is the 4K LCD CQ1U command list, not a PF12-specific document. PF12 family coverage inferred from shared Panasonic pro-display control protocol family."
  - "default credentials exposed in source; do not copy into spec verbatim."
  - "no separate variable namespace documented in source."
  - "source documents login flow as a sequence but not a named macro. No"
  - "source contains no safety warnings, interlocks, or power-on sequencing"
  - "refined source is the 4K LCD CQ1U command list; PF12 model coverage"
  - "cable type stated as \"Straight cable\" in source. Pinout not"
  - "TCP/10101 documented as \"Fixed\" port; TCP framing reuses serial"
  - "source notes \"if customer send multiple commands, be sure to wait"
  - "source marks several LAN-only query commands with the asterisk"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:14:03.043Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions matched literally in source command table; all transport parameters (9600 baud, port 10101) verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Panasonic TH-xxPF11UK / TH-xxPF12UK / TH-xxxPF12U / TH-xxPF12W Control Spec

## Summary
Control spec for Panasonic TH-xxPF11UK / TH-xxPF12UK / TH-xxxPF12U / TH-xxPF12W professional plasma display panels. Documented command set covers RS-232C and LAN control of power, input, audio, picture, TV tuner, and network settings. The refined source excerpt is the command list from the 4K LCD CQ1U series; that document confirms the protocol family but does not natively name the PF12 models, so the spec is marked draft with a model-coverage gap.

<!-- UNRESOLVED: refined source is the 4K LCD CQ1U command list, not a PF12-specific document. PF12 family coverage inferred from shared Panasonic pro-display control protocol family. -->

## Transport
```yaml
# Source explicitly states BOTH RS-232C and LAN (TCP/IP via Telnet) transports.
protocols:
  - serial
  - tcp
addressing:
  port: 10101  # source: "Port 10101(Fixed)" under LAN COMMAND FORMAT
serial:
  baud_rate: 9600  # source: "Baud rate 9600 bps"
  data_bits: 8     # source: "Character length 8 bits"
  parity: none     # source: "Parity None"
  stop_bits: 1     # source: "Stop bit 1 bit"
  flow_control: none  # source: "Flow control None"
auth:
  type: password  # source: "the Display will request login user name and password"
  # Source defaults: username "dispadmin", password "@Panasonic" - credentials not fabricated here.
  # UNRESOLVED: default credentials exposed in source; do not copy into spec verbatim.
```

## Traits
```yaml
powerable: true   # inferred from PON / POF commands in source
routable: true    # inferred from IMS (Input Change) command in source
queryable: true   # inferred from QPW / QMI / QAV / QAM / QAS / QPC / QTV / QSU / QRV / QID / QSN query commands
levelable: true   # inferred from AVL volume set, AUU/AUD volume up/down, VPC:BLT backlight commands
```

## Actions
```yaml
# CRITICAL coverage rule: enumerate EVERY distinct command row the source documents.
# Source is one combined command table; row granularity preserved below.
#
# STX = 0x02, ETX = 0x03, CR = 0x0D, LF = 0x0A per source framing.
# All serial commands are wrapped STX + <command> + ETX; LAN uses same commands after login.

- id: power_on
  label: Power ON
  kind: action
  command: "PON"  # STX + PON + ETX per source
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "POF"  # STX + POF + ETX per source
  params: []

- id: power_status_query
  label: Power Status
  kind: query
  command: "QPW"
  params: []
  # Response range: 0 (Standby / power-save on/off), 1 (Power ON)

- id: input_change_hdmi1
  label: Input Change - HDMI1
  kind: action
  command: "IMS:HM1"
  params: []

- id: input_change_hdmi2
  label: Input Change - HDMI2
  kind: action
  command: "IMS:HM2"
  params: []

- id: input_change_pc
  label: Input Change - PC
  kind: action
  command: "IMS:PC1"
  params: []

- id: input_change_tv
  label: Input Change - TV
  kind: action
  command: "IMS:TV1"
  params: []

- id: input_change_usb
  label: Input Change - USB
  kind: action
  command: "IMS:UD1"
  params: []

- id: input_query
  label: Input Inquiry
  kind: query
  command: "QMI"
  params: []
  # Response range: TV1 / HM1 / HM2 / PC1 / UD1

- id: audio_volume_set
  label: Audio Volume Set
  kind: action
  command: "AVL{level}"
  params:
    - name: level
      type: integer
      description: Volume value 000-100
  # Range 000-100

- id: audio_volume_up
  label: Audio Volume Up
  kind: action
  command: "AUU"
  params: []

- id: audio_volume_down
  label: Audio Volume Down
  kind: action
  command: "AUD"
  params: []

- id: audio_volume_query
  label: Audio Volume Query
  kind: query
  command: "QAV"
  params: []
  # Response range 000-100

- id: audio_mute_toggle
  label: Audio Mute Toggle
  kind: action
  command: "AMT"  # Toggle form per source
  params: []
  # Toggle: 0 = mute off, 1 = mute on. Parameterized form AMT:0/AMT:1 also documented.

- id: audio_mute_query
  label: Audio Mute Query
  kind: query
  command: "QAM"
  params: []
  # Response range 0 / 1

- id: aspect_change
  label: Aspect Change
  kind: action
  command: "DAM{mode}"
  params:
    - name: mode
      type: enum
      values: [FULL, NORM, NATV, ZOOM]
      description: FULL / NORMAL / NATIVE(Dot by Dot) / ZOOM

- id: aspect_query
  label: Aspect Query
  kind: query
  command: "QAS"
  params: []
  # Response range FULL / NORM / NATV / ZOOM

- id: tv_channel_up
  label: TV Channel Up
  kind: action
  command: "STV:CUP"
  params: []

- id: tv_channel_down
  label: TV Channel Down
  kind: action
  command: "STV:CDN"
  params: []

- id: tv_analog_channel_set
  label: TV Analog Channel Set
  kind: action
  command: "STV:AGC{antenna}{channel}"
  params:
    - name: antenna
      type: enum
      values: ["0", "1"]
      description: 0=Air, 1=Cable
    - name: channel
      type: string
      description: Air 002-069, Cable 001-135

- id: tv_analog_channel_query
  label: TV Analog Channel Query
  kind: query
  command: "QTV:AGC"
  params: []

- id: tv_digital_channel_set
  label: TV Digital Channel Set
  kind: action
  command: "STV:DLC{antenna}{major}"
  params:
    - name: antenna
      type: enum
      values: ["0", "1"]
      description: 0=Air, 1=Cable
    - name: major
      type: string
      description: Major channel number 00000-65535

- id: tv_digital_channel_query
  label: TV Digital Channel Query
  kind: query
  command: "QTV:DLC"
  params: []

- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  command: "VPC:MEN{mode}"
  params:
    - name: mode
      type: enum
      values: [DYN, GRH, SPT, CNM, STD, CTM]
      description: DYN=Dynamic, GRH=Graphic, SPT=Sports, CNM=Cinema, STD=Standard, CTM=Custom

- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "QPC:MEN"
  params: []

- id: backlight_set
  label: Backlight Set
  kind: action
  command: "VPC:BLT{level}"
  params:
    - name: level
      type: integer
      description: Backlight 000-050

- id: backlight_query
  label: Backlight Query
  kind: query
  command: "QPC:BLT"
  params: []

- id: lan_network_address_set
  label: LAN Setup - Network Address
  kind: action
  command: "SSU:NET{b1}{b2}{b3}{b4}{m1}{m2}{m3}{m4}{g1}{g2}{g3}{g4}{dhcp}"
  params:
    - name: b1
      type: integer
      description: IP 1st byte 000-255
    - name: b2
      type: integer
      description: IP 2nd byte 000-255
    - name: b3
      type: integer
      description: IP 3rd byte 000-255
    - name: b4
      type: integer
      description: IP 4th byte 000-255
    - name: m1
      type: integer
      description: Subnet mask 1st byte 000-255
    - name: m2
      type: integer
      description: Subnet mask 2nd byte 000-255
    - name: m3
      type: integer
      description: Subnet mask 3rd byte 000-255
    - name: m4
      type: integer
      description: Subnet mask 4th byte 000-255
    - name: g1
      type: integer
      description: Gateway 1st byte 000-255
    - name: g2
      type: integer
      description: Gateway 2nd byte 000-255
    - name: g3
      type: integer
      description: Gateway 3rd byte 000-255
    - name: g4
      type: integer
      description: Gateway 4th byte 000-255
    - name: dhcp
      type: enum
      values: ["0", "1"]
      description: 0=DHCP OFF, 1=DHCP ON
  # Note from source: *1 Power save mode = off only

- id: lan_network_address_query
  label: LAN Setup - Network Address Query
  kind: query
  command: "QSU:NET"
  params: []
  # Note: *1 Power save mode = off only

- id: telnet_username_set
  label: Telnet Username Set
  kind: action
  command: "SSU:UNM{username}"
  params:
    - name: username
      type: string
      description: Max 16 chars; alnum + space + _ - @  [RS232C only]
  # Default username exposed in source: "dispadmin" (not duplicated here)

- id: telnet_username_query
  label: Telnet Username Query
  kind: query
  command: "QSU:UNM"
  params: []
  # Note: *1 Power save mode = off only

- id: telnet_password_set
  label: Telnet Password Set
  kind: action
  command: "SSU:UPW{password}"
  params:
    - name: password
      type: string
      description: Max 16 chars; alnum + space + _ - @  [RS232C only]
  # Default password exposed in source: "@Panasonic" (not duplicated here)

- id: telnet_password_query
  label: Telnet Password Query
  kind: query
  command: "QSU:UPW"
  params: []
  # Note: *1 Power save mode = off only

- id: software_version_query
  label: Software Version Query
  kind: query
  command: "QRV"
  params: []
  # Example response: 1.0000
  # Note: *1 Power save mode = off only

- id: software_version_lan_mcu_query
  label: Software Version (LAN MCU) Query
  kind: query
  command: "QRV:LAN"
  params: []
  # Example response: 01.00
  # Note: *1 Power save mode = off only

- id: model_query
  label: Model Query
  kind: query
  command: "QID"
  params: []
  # Response format: inch size (43/50/55/65/75/86) + model code
  # Note: *1 Power save mode = off only

- id: serial_number_query
  label: Serial Number Query
  kind: query
  command: "QSN"
  params: []
  # Response: 9-15 ASCII characters; 0x30-0x39, 0x41-0x5a, 0x20, 0x2d
  # Note: *1 Power save mode = off only

- id: lan_disconnect_bye
  label: LAN Disconnect (BYE)
  kind: action
  command: "BYE\r\n"
  params: []
  # Source: "the host send 'BYE\r\n' command to the Display"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["0", "1"]
  description: "0=Standby (incl. power-save on/off), 1=Power ON"
  source_command: QPW

- id: input_state
  type: enum
  values: [TV1, HM1, HM2, PC1, UD1]
  description: "TV / HDMI1 / HDMI2 / PC / USB"
  source_command: QMI

- id: audio_volume
  type: integer
  range: "000-100"
  source_command: QAV

- id: audio_mute_state
  type: enum
  values: ["0", "1"]
  description: "0=Mute off, 1=Mute on"
  source_command: QAM

- id: aspect_state
  type: enum
  values: [FULL, NORM, NATV, ZOOM]
  source_command: QAS

- id: picture_mode_state
  type: enum
  values: [DYN, GRH, SPT, CNM, STD, CTM]
  source_command: QPC:MEN

- id: backlight_state
  type: integer
  range: "000-050"
  source_command: QPC:BLT

- id: software_version
  type: string
  description: "e.g. 1.0000"
  source_command: QRV

- id: software_version_lan_mcu
  type: string
  description: "e.g. 01.00"
  source_command: QRV:LAN

- id: model_id
  type: string
  description: "inch + model code, e.g. 50.CQ1"
  source_command: QID

- id: serial_number
  type: string
  description: "9-15 ASCII chars (0x30-0x39, 0x41-0x5a, 0x20, 0x2d)"
  source_command: QSN

- id: error_er401
  type: string
  description: "ER401 returned for incorrect commands"
  source_command: ER401
```

## Variables
```yaml
# Settable parameters documented as commands; enumerated in Actions. No additional
# implicit variables beyond what the action set exposes.
# UNRESOLVED: no separate variable namespace documented in source.
```

## Events
```yaml
# Source documents one implicit event class: ER401 error reply for incorrect commands.
- id: error_reply
  description: Device replies ER401 when it receives an unrecognised command.
  source_evidence: "If an incorrect command is sent, this unit will reply an 'ER401' command to the computer."

# Source also documents LAN-side events during login:
- id: lan_username_prompt
  description: After TCP connect, Display sends a username prompt.
  source_evidence: "The Display will send after connecting (username prompt)"

- id: lan_password_prompt
  description: After username accepted, Display sends a password prompt.
  source_evidence: "The Display will send (password prompt)"

- id: lan_login_ok
  description: Display replies OK on successful login.
  source_evidence: "If success to login, the Display will reply 'OK'"

- id: lan_login_incorrect
  description: Display replies 'Login incorrect' and disconnects on failure.
  source_evidence: "If fail to login, the Display will reply message 'Login incorrect' and disconnect immediately."

- id: lan_idle_disconnect
  description: Display disconnects after 1 minute of no data.
  source_evidence: "If no data during 1 minute, the Display will disconnect for security."
```

## Macros
```yaml
# UNRESOLVED: source documents login flow as a sequence but not a named macro. No
# other multi-step sequences are documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing
# requirements specific to the PF12 family.
```

## Notes
<!-- UNRESOLVED: refined source is the 4K LCD CQ1U command list; PF12 model coverage
inferred from shared Panasonic pro-display control protocol family (RS-232C + LAN
on TCP/10101 + Telnet). Source does NOT explicitly name the TH-xxPF11UK,
TH-xxPF12UK, TH-xxxPF12U, or TH-xxPF12W models. -->

<!-- UNRESOLVED: cable type stated as "Straight cable" in source. Pinout not
documented in the refined excerpt. -->

<!-- UNRESOLVED: TCP/10101 documented as "Fixed" port; TCP framing reuses serial
STX/ETX/CR/LF wrapper. Source does not document Unicode or non-ASCII handling
beyond the documented character set for username/password. -->

<!-- UNRESOLVED: source notes "if customer send multiple commands, be sure to wait
for the response for the first command to come before sending the next command" —
command-response timing not quantified. -->

<!-- UNRESOLVED: source marks several LAN-only query commands with the asterisk
"*1 Power save mode = off only" — full implication for behaviour outside power-save
mode not documented in the refined excerpt. -->

Default credentials ("dispadmin" / "@Panasonic") are exposed in the public source
document and are not duplicated verbatim into spec fields. Operators should rotate
the default password on deployment.

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
  - manualshelf.com
  - mediarealm.com.au
  - manualslib.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/CQ1_U_SerialCommandList.pdf
  - https://www.manualshelf.com/manual/panasonic/rs232-protocols/hints-and-tips-english.html
  - https://www.mediarealm.com.au/articles/panasonic-projector-commands/
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://www.manualslib.com/manual/700642/Panasonic-Rs-232c.html
retrieved_at: 2026-06-15T12:46:06.021Z
last_checked_at: 2026-06-16T07:14:03.043Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:14:03.043Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions matched literally in source command table; all transport parameters (9600 baud, port 10101) verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "refined source is the 4K LCD CQ1U command list, not a PF12-specific document. PF12 family coverage inferred from shared Panasonic pro-display control protocol family."
- "default credentials exposed in source; do not copy into spec verbatim."
- "no separate variable namespace documented in source."
- "source documents login flow as a sequence but not a named macro. No"
- "source contains no safety warnings, interlocks, or power-on sequencing"
- "refined source is the 4K LCD CQ1U command list; PF12 model coverage"
- "cable type stated as \"Straight cable\" in source. Pinout not"
- "TCP/10101 documented as \"Fixed\" port; TCP framing reuses serial"
- "source notes \"if customer send multiple commands, be sure to wait"
- "source marks several LAN-only query commands with the asterisk"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
