---
spec_id: admin/panasonic-th-lfv8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic Ultra Narrow Bezel LCD Display TH-LFV8 Control Spec"
manufacturer: Panasonic
model_family: TH-49LFV8
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
    - "Panasonic Corporation"
  models:
    - TH-49LFV8
    - TH-55LFV8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - na.panasonic.com
source_urls:
  - https://na.panasonic.com/ns/228838_C150_R1_LFV8_SerialCommandList_user_Ver_1_01_en.pdf
retrieved_at: 2026-07-02T18:17:55.221Z
last_checked_at: 2026-07-07T11:50:01.636Z
generated_at: 2026-07-07T11:50:01.636Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "broader family name \"Vf1H Lfv70 Lfv8 Sst Series\" supplied as input, but this source document only explicitly names TH-49LFV8/55LFV8. Other models (VF1H, LFV70, SST) not named in this source."
  - "voltage/current/power specs not in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "models VF1H / LFV70 / SST mentioned only in the input device name, not in this source document — not added to compatible_with.models."
  - "protocol version, firmware compatibility ranges not stated in source."
  - "exact byte checksum scheme — none documented (no checksum byte; framing is STX/ETX only)."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:50:01.636Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions matched verbatim in source; complete bidirectional coverage of command catalogue and transport parameters. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Panasonic Ultra Narrow Bezel LCD Display TH-LFV8 Control Spec

## Summary
Panasonic Ultra Narrow Bezel LCD Display (TH-49LFV8 / TH-55LFV8), controlled over RS-232C serial. Provides power, input selection, audio/video mute, volume, multi-display/tiling setup, and status query commands. Basic frame: STX + 3-character command [+ ":" + parameters] + ETX.

<!-- UNRESOLVED: broader family name "Vf1H Lfv70 Lfv8 Sst Series" supplied as input, but this source document only explicitly names TH-49LFV8/55LFV8. Other models (VF1H, LFV70, SST) not named in this source. -->
<!-- UNRESOLVED: voltage/current/power specs not in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  signal_level: RS-232C compliant
  synchronization: asynchronous
  cable_type: cross cable
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from PON/POF power commands
- levelable    # inferred from AVL volume control
- queryable    # inferred from QPW/QMI/QAV/QAM/QVM/QDC/QRV/QSN queries
```

## Actions
```yaml
# All commands transmitted inside the basic frame: <STX><command>[:<params>]<ETX>
# STX = 0x02, ETX = 0x03. Colon ":" omitted when no parameters.
# Example (Power on): STX P O N ETX  ->  02 50 4F 4E 03

- id: power_on
  label: Power ON
  kind: action
  command: "PON"
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "POF"
  params: []

- id: input_change_toggle
  label: Input Change (Toggle)
  kind: action
  command: "IMS"
  params: []
  notes: Sequentially toggles USB HDMI1 HDMI2 Display Port DVI-D YPbPr(COMPONENT) AV(CVBS) VGA(PC)

- id: select_input
  label: Input Change
  kind: action
  command: "IMS:{input}"
  params:
    - name: input
      type: string
      description: "Input code. Allowed: HM1 (HDMI1), HM2 (HDMI2), DP1 (Display Port), DV1 (DVI-D), PC1 (VGA/PC), YP1 (YPbPr/COMPONENT), VD1 (AV/CVBS/VIDEO), UD1 (USB)"

- id: set_audio_volume
  label: Audio Volume
  kind: action
  command: "AVL:{level}"
  params:
    - name: level
      type: integer
      description: "Volume value 0~60. Parameter is 3 digits zero-padded, e.g. AVL:000 .. AVL:060"

- id: volume_up
  label: Volume Up
  kind: action
  command: "AUU"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "AUD"
  params: []

- id: audio_mute_toggle
  label: Audio Mute (Toggle)
  kind: action
  command: "AMT"
  params: []

- id: set_audio_mute
  label: Audio Mute
  kind: action
  command: "AMT:{state}"
  params:
    - name: state
      type: integer
      description: "0 = Audio mute Off, 1 = Audio mute On"

- id: video_mute_toggle
  label: Video Mute (Toggle)
  kind: action
  command: "VMT"
  params: []

- id: set_video_mute
  label: Video Mute
  kind: action
  command: "VMT:{state}"
  params:
    - name: state
      type: integer
      description: "0 = Video mute Off, 1 = Video mute On"

- id: multi_display_on_off
  label: Multi Display ON/OFF
  kind: action
  command: "MDC:{state}"
  params:
    - name: state
      type: integer
      description: "0 = OFF, 1 = ON"

- id: multi_display_setup_detail
  label: Multi Display Setup Detail
  kind: action
  command: "MDC:EXQ{enable}{h_monitors}{v_monitors}{frame_comp}{position}"
  params:
    - name: enable
      type: integer
      description: "0 = OFF, 1 = ON"
    - name: h_monitors
      type: integer
      description: "Horizontal monitors 1~10 (2 digits)"
    - name: v_monitors
      type: integer
      description: "Vertical monitors 1~10 (2 digits)"
    - name: frame_comp
      type: integer
      description: "Frame compensation: 0 = OFF, 1 = ON, 2 = CONTINUE"
    - name: position
      type: integer
      description: "Position 1~100 (3 digits)"
  notes: Source notation "MDC:EXQ* ** ** * ***" maps to enable(1)/h(2)/v(2)/frame(1)/position(3) digit groups

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "QPW"
  params: []

- id: input_query
  label: Input Query
  kind: query
  command: "QMI"
  params: []

- id: current_volume_query
  label: Current Audio Volume Query
  kind: query
  command: "QAV"
  params: []

- id: audio_mute_query
  label: Audio Mute Query
  kind: query
  command: "QAM"
  params: []

- id: video_mute_query
  label: Video Mute Query
  kind: query
  command: "QVM"
  params: []

- id: multi_display_setup_detail_query
  label: Multi Display Setup Detail Query
  kind: query
  command: "QDC:EXQ"
  params: []

- id: software_version_query
  label: Software Version Main MCU Query
  kind: query
  command: "QRV"
  params: []

- id: serial_number_query
  label: Serial Number Query
  kind: query
  command: "QSN"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  reply_format: "QPW:{state}"
  description: "0 = Standby(Off), 1 = Power ON(On)"

- id: current_input
  type: enum
  values: [HM1, HM2, DP1, DV1, PC1, YP1, VD1, UD1]
  reply_format: "QMI:{input}"
  description: "HM1=HDMI1, HM2=HDMI2, DP1=Display Port, DV1=DVI-D, PC1=VGA, YP1=YPbPr, VD1=AV/CVBS, UD1=USB"

- id: current_volume
  type: integer
  range: "000-060"
  reply_format: "QAV:{level}"

- id: audio_mute_state
  type: enum
  values: [off, on]
  reply_format: "QAM:{state}"

- id: video_mute_state
  type: enum
  values: [off, on]
  reply_format: "QVM:{state}"

- id: multi_display_setup_state
  type: string
  reply_format: "QDC:EXQ{enable}{h}{v}{frame}{position}"

- id: software_version
  type: string
  reply_format: "QRV:{version}"
  description: "Example: 1.0000 LFV8"

- id: serial_number
  type: string
  reply_format: "QSN:{serial}"
  description: "ASCII 9~14 characters (0x30-0x39, 0x41-0x5A, 0x20, 0x2D)"

- id: command_error
  type: enum
  values: [error]
  reply_format: "ER401"
  description: "Returned when an incorrect command is sent. Framed <STX>ER401<ETX>"
```

## Variables
```yaml
- id: audio_volume
  set_command: "AVL:{level}"
  query_command: "QAV"
  type: integer
  range: [0, 60]

- id: audio_mute
  set_command: "AMT:{state}"
  query_command: "QAM"
  type: enum
  values: [off, on]

- id: video_mute
  set_command: "VMT:{state}"
  query_command: "QVM"
  type: enum
  values: [off, on]

- id: multi_display_enable
  set_command: "MDC:{state}"
  type: enum
  values: [off, on]
```

## Events
```yaml
# No unsolicited notifications documented. ER401 is a solicited error reply (see Feedbacks).
```

## Macros
```yaml
# Serial-ID addressing wrapper (daisy-chain). Wraps any command for a specific display:
#   <STX>AD94;RAD:<NNN>;<command><ETX>   or   <STX>RAD:<NNN>;<command><ETX>
# <NNN> = 3-digit Serial ID (Display ID). "000" = broadcast (response per "Serial response(ID all)" setting).
# Not a multi-step macro; documented as an addressing format variant.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond ECO-mode standby behavior notes.
```

## Notes
- **Command framing (applies to ALL commands):** Transmission begins with STX (0x02), then the 3-character command, then a colon ":" + parameters (if any), then ETX (0x03). If there are no parameters, the colon is omitted.
  - Power on verbatim: `02 50 4F 4E 03`
  - Input HDMI1 example: `02 49 4D 53 3A 48 4D 31 03` (NOTE: source binary line prints `02 49 4D 42 3A 48 4D 31 03` where 0x42='B' — appears to be a source typo; character row reads "IMS:HM1" so 0x53='S' is correct. Reproduced per character/mnemonic definition from the command table.)
- **Response pacing:** When sending multiple commands, wait for the response of the first command before sending the next; leave >= 750 ms between commands.
- **Incorrect command reply:** unit returns `<STX>ER401<ETX>`.
- **Standby / ECO mode behavior:**
  - ECO mode = Normal: display responds to PON/POF/QPW only during standby, and replies to reply commands.
  - ECO mode = Low power standby: only PON is valid during standby and PON does not return a response. Recommend ECO mode = Normal for serial control.
- **Basic vs Serial-ID format:** Use basic format when a single display is connected to the PC. Use the Serial-ID (AD94;RAD: / RAD:) command format when displays are daisy-chained; set non-overlapping Monitor IDs per display.
- **OSD interaction:** When checking settings via OSD, change settings via command first, then open OSD. If OSD is open while a command changes settings, close and reopen the OSD.
- **Detailed video adjustment:** use the remote controller or Video Wall Manager application for fine video adjustment.

<!-- UNRESOLVED: models VF1H / LFV70 / SST mentioned only in the input device name, not in this source document — not added to compatible_with.models. -->
<!-- UNRESOLVED: protocol version, firmware compatibility ranges not stated in source. -->
<!-- UNRESOLVED: exact byte checksum scheme — none documented (no checksum byte; framing is STX/ETX only). -->
````

Source covered 21 distinct commands across power, input, volume, mute, multi-display, and diagnostics. Gaps marked UNRESOLVED (other models in family, firmware range, voltage/power).

## Provenance

```yaml
source_domains:
  - na.panasonic.com
source_urls:
  - https://na.panasonic.com/ns/228838_C150_R1_LFV8_SerialCommandList_user_Ver_1_01_en.pdf
retrieved_at: 2026-07-02T18:17:55.221Z
last_checked_at: 2026-07-07T11:50:01.636Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:50:01.636Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions matched verbatim in source; complete bidirectional coverage of command catalogue and transport parameters. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "broader family name \"Vf1H Lfv70 Lfv8 Sst Series\" supplied as input, but this source document only explicitly names TH-49LFV8/55LFV8. Other models (VF1H, LFV70, SST) not named in this source."
- "voltage/current/power specs not in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "models VF1H / LFV70 / SST mentioned only in the input device name, not in this source document — not added to compatible_with.models."
- "protocol version, firmware compatibility ranges not stated in source."
- "exact byte checksum scheme — none documented (no checksum byte; framing is STX/ETX only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
