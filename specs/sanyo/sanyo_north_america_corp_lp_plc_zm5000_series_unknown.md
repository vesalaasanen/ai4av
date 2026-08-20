---
spec_id: admin/sanyo-plc-zm5000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sanyo PLC-ZM5000 Series Control Spec"
manufacturer: Sanyo
model_family: PLC-ZM5000
aliases: []
compatible_with:
  manufacturers:
    - Sanyo
    - "Sanyo North America Corp"
  models:
    - PLC-ZM5000
    - PLC-ZM5000L
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - web.archive.org
  - manualslib.com
source_urls:
  - https://www.audiogeneral.com/Sanyo/plczm5000l_rs232.pdf
  - "http://web.archive.org/web/20120131192159if_/http://us.sanyo.com/dynamic/product/Downloads/PLC-ZM5000_Basic%20Command-6087627.pdf"
  - https://www.manualslib.com/manual/439273/Sanyo-Plc-Zm5000l-5000-Lumens.html
  - https://www.manualslib.com/manual/439275/Sanyo-Plc-Zm5000l-5000-Lumens.html
  - https://www.manualslib.com/manual/652507/Sanyo-Plc-Zm5000.html
retrieved_at: 2026-08-17T13:54:14.717Z
last_checked_at: 2026-08-05T08:37:52.395Z
generated_at: 2026-08-05T08:37:52.395Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "vendor doc authored by SANYO Electric Co., Ltd DS Company Projector Division; entity manufacturer token is \"Sanyo North America Corp\" per operator. No voltage/power/lamp-wattage specs in source."
  - "source specifies D-Sub 9Pin (COM ↔ CONTROL PORT) but does not state"
  - "source documents no settable numeric parameter with explicit value"
  - "source documents no unsolicited notifications. All responses are"
  - "source documents no multi-step command sequences."
  - "source does not state explicit confirmation/interlock procedures"
  - "firmware version compatibility not stated (doc cover says Ver.1.00 but device firmware range unknown)."
  - "serial cable pinout / TX-RX crossover not documented in source."
  - "lamp wattage, power draw, voltage specs not in this control doc."
  - "exact list of Networking-capable models vs base models for CR1='4' response not enumerated."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:37:52.395Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 spec actions (61 functional + 6 status) match source commands verbatim; transport values corroborated by §2.1. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-02
---

# Sanyo PLC-ZM5000 Series Control Spec

## Summary
RS-232C control spec for the Sanyo PLC-ZM5000 / PLC-ZM5000L projector. Defines Functional Execution Commands (remote/console key equivalents) and Status Read Commands (projector state queries). All commands are ASCII, start with `C`, end with carriage return (0x0D).

<!-- UNRESOLVED: vendor doc authored by SANYO Electric Co., Ltd DS Company Projector Division; entity manufacturer token is "Sanyo North America Corp" per operator. No voltage/power/lamp-wattage specs in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # initial setting; 9600 also supported. Service-mode changeable.
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
# UNRESOLVED: source specifies D-Sub 9Pin (COM ↔ CONTROL PORT) but does not state
# the cable pinout (TX/RX crossover) - dedicated serial cable required per source.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: C00/C01/C02 power on/off commands present
  - queryable    # inferred: CR0-CR7 status read commands returning values
  - levelable    # inferred: VOLUME +/-, BRIGHTNESS +/-, ZOOM +/-, FOCUS +/- present
```

## Actions
```yaml
# All commands sent as ASCII `C` + two-char code + CR (0x0D). Source writes payloads
# as e.g. "C00" [CR]; here shown as "C00\r" where \r = 0x0D carriage return.
# ACK response = 0x06 0x0D ([ACK][CR]); decode failure = "?" + CR.
# Pipelining interval after ACK: 100ms for VOLUME/ZOOM/FOCUS/LENS-SHIFT, 500ms others.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "C00\r"
  params: []
  notes: "No-op if already ON. Sending during Countdown terminates Countdown."

- id: power_off_quick
  label: Power Off (Quick)
  kind: action
  command: "C01\r"
  params: []
  notes: "Quick power off; skips 'Power OFF?' confirmation message."

- id: power_off
  label: Power Off
  kind: action
  command: "C02\r"
  params: []
  notes: "Mirrors ON/STAND-BY button. First send shows 'Power OFF?'; second send executes. Terminates Countdown if sent during it."

# --- Input selection ---
- id: select_input_1
  label: Select Input 1
  kind: action
  command: "C05\r"
  params: []

- id: select_input_2
  label: Select Input 2
  kind: action
  command: "C06\r"
  params: []

- id: select_input_3
  label: Select Input 3
  kind: action
  command: "C07\r"
  params: []

- id: select_network
  label: Select Network Input
  kind: action
  command: "C08\r"
  params: []

- id: select_input_2_video
  label: Select Input 2 Video
  kind: action
  command: "C23\r"
  params: []

- id: select_input_2_ypbpr
  label: Select Input 2 Y,Pb/Cb,Pr/Cr
  kind: action
  command: "C24\r"
  params: []

- id: select_input_2_rgb
  label: Select Input 2 RGB
  kind: action
  command: "C25\r"
  params: []

- id: select_input_3_video
  label: Select Input 3 Video
  kind: action
  command: "C33\r"
  params: []

- id: select_input_3_svideo
  label: Select Input 3 S-Video
  kind: action
  command: "C34\r"
  params: []

- id: select_input_3_ypbpr
  label: Select Input 3 Y,Pb/Cb,Pr/Cr
  kind: action
  command: "C35\r"
  params: []

- id: select_input_1_hdmi
  label: Select Input 1 HDMI
  kind: action
  command: "C4F\r"
  params: []

- id: select_input_1_analog_rgb
  label: Select Input 1 Analog RGB
  kind: action
  command: "C50\r"
  params: []

- id: select_input_1_scart
  label: Select Input 1 SCART
  kind: action
  command: "C51\r"
  params: []

- id: select_input_1_dvi_pc_digital
  label: Select Input 1 DVI (PC Digital)
  kind: action
  command: "C52\r"
  params: []

- id: select_input_1_dvi_av_hdcp
  label: Select Input 1 DVI (AV HDCP)
  kind: action
  command: "C53\r"
  params: []

# --- Audio ---
- id: volume_up
  label: Volume Up
  kind: action
  command: "C09\r"
  params: []
  notes: "Pipeline at 100ms intervals."

- id: volume_down
  label: Volume Down
  kind: action
  command: "C0A\r"
  params: []
  notes: "Pipeline at 100ms intervals."

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "C0B\r"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "C0C\r"
  params: []

# --- Video mute / shutter ---
- id: video_mute_on
  label: Video Mute On (Shutter Close)
  kind: action
  command: "C0D\r"
  params: []

- id: video_mute_off
  label: Video Mute Off (Shutter Open)
  kind: action
  command: "C0E\r"
  params: []

# --- Screen size ---
- id: screen_normal_size
  label: Screen Normal Size (4:3)
  kind: action
  command: "C0F\r"
  params: []

- id: screen_full_size
  label: Screen Full Size
  kind: action
  command: "C10\r"
  params: []

# --- OSD / Menu ---
- id: menu_on
  label: Menu On
  kind: action
  command: "C1C\r"
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  command: "C1D\r"
  params: []

- id: display_clear
  label: Display Clear
  kind: action
  command: "C1E\r"
  params: []
  notes: "Clears OSD under all conditions."

# --- Image adjustments ---
- id: brightness_up
  label: Brightness Up
  kind: action
  command: "C20\r"
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  command: "C21\r"
  params: []

- id: image_switch
  label: Switch Image Setting
  kind: action
  command: "C27\r"
  params: []

# --- Direct On / Power Management (EEPROM-persisted) ---
- id: direct_on_enable
  label: Direct On Enable
  kind: action
  command: "C28\r"
  params: []
  notes: "Stored in EEPROM; retained across power cycles."

- id: direct_on_disable
  label: Direct On Disable
  kind: action
  command: "C29\r"
  params: []
  notes: "Stored in EEPROM; retained across power cycles."

- id: power_management_ready
  label: Power Management Ready
  kind: action
  command: "C2A\r"
  params: []
  notes: "Stored in EEPROM; retained across power cycles."

- id: power_management_off
  label: Power Management Off
  kind: action
  command: "C2B\r"
  params: []
  notes: "Stored in EEPROM; retained across power cycles."

- id: power_management_shutdown
  label: Power Management Shutdown
  kind: action
  command: "C2E\r"
  params: []
  notes: "Stored in EEPROM; retained across power cycles."

# --- Digital zoom ---
- id: dzoom_up
  label: Digital Zoom Up
  kind: action
  command: "C30\r"
  params: []

- id: dzoom_down
  label: Digital Zoom Down
  kind: action
  command: "C31\r"
  params: []

# --- Pointer / navigation ---
- id: pointer_right
  label: Pointer Right
  kind: action
  command: "C3A\r"
  params: []

- id: pointer_left
  label: Pointer Left
  kind: action
  command: "C3B\r"
  params: []

- id: pointer_up
  label: Pointer Up
  kind: action
  command: "C3C\r"
  params: []

- id: pointer_down
  label: Pointer Down
  kind: action
  command: "C3D\r"
  params: []

- id: enter
  label: Enter (Select)
  kind: action
  command: "C3F\r"
  params: []

# --- Freeze ---
- id: freeze_on
  label: Freeze On
  kind: action
  command: "C43\r"
  params: []

- id: freeze_off
  label: Freeze Off
  kind: action
  command: "C44\r"
  params: []

# --- Lens / zoom / focus ---
- id: zoom_up
  label: Zoom Up (Expand)
  kind: action
  command: "C47\r"
  params: []
  notes: "Pipeline at 100ms intervals."

- id: zoom_down
  label: Zoom Down (Reduce)
  kind: action
  command: "C46\r"
  params: []
  notes: "Pipeline at 100ms intervals."

- id: focus_up
  label: Focus Up (Longer Focal Length)
  kind: action
  command: "C4B\r"
  params: []
  notes: "Pipeline at 100ms intervals."

- id: focus_down
  label: Focus Down (Shorter Focal Length)
  kind: action
  command: "C4A\r"
  params: []
  notes: "Pipeline at 100ms intervals."

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  command: "C5D\r"
  params: []
  notes: "Pipeline at 100ms intervals."

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  command: "C5E\r"
  params: []
  notes: "Pipeline at 100ms intervals."

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  command: "C5F\r"
  params: []
  notes: "Pipeline at 100ms intervals."

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  command: "C60\r"
  params: []
  notes: "Pipeline at 100ms intervals."

# --- Auto PC / Timer ---
- id: auto_pc_adj
  label: Auto PC Adj
  kind: action
  command: "C89\r"
  params: []
  notes: "Sending during Auto PC Adj process terminates it."

- id: presentation_timer_start
  label: Presentation Timer Start
  kind: action
  command: "C8A\r"
  params: []

- id: presentation_timer_exit
  label: Presentation Timer Exit
  kind: action
  command: "C8B\r"
  params: []

# --- Keystone ---
- id: keystone_up
  label: Keystone Up (Reduce Upper)
  kind: action
  command: "C8E\r"
  params: []

- id: keystone_down
  label: Keystone Down (Reduce Lower)
  kind: action
  command: "C8F\r"
  params: []

- id: keystone_right
  label: Keystone Right (Reduce Right)
  kind: action
  command: "C90\r"
  params: []

- id: keystone_left
  label: Keystone Left (Reduce Left)
  kind: action
  command: "C91\r"
  params: []

# --- Status read (query) commands; format: "CR" + one char + CR ---
- id: status_read
  label: Status Read (Operating Status)
  kind: query
  command: "CR0\r"
  params: []
  notes: "Returns 2-char hex status code + CR. See Feedbacks.status_state."

- id: input_mode_read
  label: Input Mode Read
  kind: query
  command: "CR1\r"
  params: []
  notes: "Returns '1'..'4' + CR ('4' only on Networking-capable models)."

- id: lamp_time_read
  label: Lamp Time Read
  kind: query
  command: "CR3\r"
  params: []
  notes: "Returns 5-digit lamp hours (coefficient-applied) + CR. e.g. '00410' = 410h."

- id: setting_read
  label: Setting Read (Screen Setting)
  kind: query
  command: "CR4\r"
  params: []
  notes: "Returns 2-char ceiling/rear code + CR."

- id: temp_read
  label: Temp Read
  kind: query
  command: "CR6\r"
  params: []
  notes: "Returns '%1_%2_%3' + CR (underscore = space). Each field formatted '_00.0' / '-05.5' / 'E00.0'."

- id: lamp_mode_read
  label: Lamp Mode Read
  kind: query
  command: "CR7\r"
  params: []
  notes: "Returns '00' (lamp ON) or '01' (lamp OFF) + CR."
```

## Feedbacks
```yaml
- id: status_state
  type: enum
  values:
    - "00"  # Power ON
    - "80"  # Standby
    - "40"  # Countdown in process
    - "20"  # Cooling Down in process
    - "10"  # Power Failure
    - "28"  # Cooling Down due to Abnormal Temperature
    - "88"  # Standby after Cooling Down due to Abnormal Temperature
    - "24"  # Power-Save Cooling Down in process
    - "04"  # Power Save
    - "21"  # Cooling Down after OFF due to Lamp Failure
    - "81"  # Standby after Cooling Down due to Lamp Failure
    - "2C"  # Cooling Down due to Shutter Management
    - "8C"  # Standby after Cooling Down due to Shutter Management
  source_query: status_read

- id: input_mode
  type: enum
  values:
    - "1"  # Input 1
    - "2"  # Input 2
    - "3"  # Input 3
    - "4"  # Input 4 (Networking-capable models only)
  source_query: input_mode_read

- id: lamp_time_hours
  type: integer
  source_query: lamp_time_read
  notes: "5-digit string; coefficient-applied hours, not raw."

- id: screen_setting
  type: enum
  values:
    - "11"  # Normal
    - "10"  # Rear & Ceiling ON
    - "01"  # Rear ON
    - "00"  # Ceiling ON
  source_query: setting_read

- id: temperatures
  type: string
  source_query: temp_read
  notes: "Three sensor readings, space-separated, each '_00.0' / '-05.5' / 'E00.0'."

- id: lamp_mode
  type: enum
  values:
    - "00"  # Lamp ON
    - "01"  # Lamp OFF
  source_query: lamp_mode_read

- id: command_ack
  type: literal
  values: ["\\x06\\r"]  # [ACK][CR] - 0x06 0x0D, returned on accepted Functional Execution Command

- id: command_nack
  type: literal
  values: ["?\\r"]  # "?" + CR, returned when received data cannot be decoded
```

## Variables
```yaml
# UNRESOLVED: source documents no settable numeric parameter with explicit value
# range (brightness/volume/zoom adjusted via +/- key equivalents only). No
# Variables entries populated.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are
# solicited by a command (ACK for functional commands, data string for reads).
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_init_delay
    description: "Approx. 7 seconds internal initialization after AC power plug-in. Commands not processed during this window. Do not issue commands."
  - id: power_on_warmup_lockout
    description: "During 7 seconds after POWER ON in Standby mode, Functional Execution Commands return ACK but are not executed. Status Read Commands execute 500ms after ACK for POWER ON."
  - id: input_switch_lockout
    description: "During 5 seconds after INPUT switching command, Functional Execution Commands return ACK but are not executed. Status Read Commands execute 500ms after ACK for INPUT switch."
  - id: countdown_lockout
    description: "During Countdown after POWER ON and Cooling after POWER OFF, Functional Execution Commands return ACK but are not executed. Limited exceptions: see source 6.4.1."
  - id: cooling_down_lockout
    description: "During Cooling Down (normal, abnormal-temp, power-save, lamp-failure, shutter-management), NO Functional Execution Commands are executed."
  - id: abnormal_status_lockout
    description: "In Abnormal Temperature, Abnormal Power, Abnormal Filter, Cooling due to Abnormal Temperature status: no Functional Execution Commands executed."
  - id: eco_standby_lockout
    description: "When 'Eco' mode is selected in Standby mode menu, all Functional Execution and Status Read Commands are invalid in Standby."
# UNRESOLVED: source does not state explicit confirmation/interlock procedures
# beyond status-gated command acceptance; values above are direct descriptions
# of source-stated behavior, not inferences.
```

## Notes
- **Command framing:** Every command is one line, starts with `C`, ends with carriage return (0x0D). Decoding begins on receipt of CR. Capital letters (A–Z) only.
- **Buffer clear:** Receive buffer clears on receipt of LF (0x0A) or EOF (0x1A), or if >1 second elapses between first byte and CR for a single command.
- **Pipelining intervals (after ACK receipt, before next command):**
  - 100ms for VOLUME +/-, ZOOM +/-, FOCUS +/-, LENS-SHIFT UP/DOWN/LEFT/RIGHT
  - 500ms for all other Functional Execution Commands
  - ≥500ms for Status Read Commands
- **Pipelining behavior** (VOLUME/ZOOM/FOCUS type): function executes for 120ms per received command; repeat command within 120ms extends execution by another 120ms; different command within 120ms or no command for 120ms stops pipelining.
- **No-subsequent-command rule:** Do not send another command before receiving the response, unless >5 seconds have elapsed with no response.
- **Cable:** Dedicated serial D-Sub 9Pin cable required (PC COM ↔ projector CONTROL PORT). Pinout not specified.
- **Operation-requirements table** (source 6.4.1) governs which commands are accepted in each projector status (Standby, Countdown, Cooling, Power Save, Abnormal states, Eco Standby, Input button Mode2/Mode3). See Safety interlocks.
- **"---" rows** in the source command tables mean "No Function" and are omitted from this spec.

<!-- UNRESOLVED: firmware version compatibility not stated (doc cover says Ver.1.00 but device firmware range unknown). -->
<!-- UNRESOLVED: serial cable pinout / TX-RX crossover not documented in source. -->
<!-- UNRESOLVED: lamp wattage, power draw, voltage specs not in this control doc. -->
<!-- UNRESOLVED: exact list of Networking-capable models vs base models for CR1='4' response not enumerated. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - web.archive.org
  - manualslib.com
source_urls:
  - https://www.audiogeneral.com/Sanyo/plczm5000l_rs232.pdf
  - "http://web.archive.org/web/20120131192159if_/http://us.sanyo.com/dynamic/product/Downloads/PLC-ZM5000_Basic%20Command-6087627.pdf"
  - https://www.manualslib.com/manual/439273/Sanyo-Plc-Zm5000l-5000-Lumens.html
  - https://www.manualslib.com/manual/439275/Sanyo-Plc-Zm5000l-5000-Lumens.html
  - https://www.manualslib.com/manual/652507/Sanyo-Plc-Zm5000.html
retrieved_at: 2026-08-17T13:54:14.717Z
last_checked_at: 2026-08-05T08:37:52.395Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:37:52.395Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 spec actions (61 functional + 6 status) match source commands verbatim; transport values corroborated by §2.1. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "vendor doc authored by SANYO Electric Co., Ltd DS Company Projector Division; entity manufacturer token is \"Sanyo North America Corp\" per operator. No voltage/power/lamp-wattage specs in source."
- "source specifies D-Sub 9Pin (COM ↔ CONTROL PORT) but does not state"
- "source documents no settable numeric parameter with explicit value"
- "source documents no unsolicited notifications. All responses are"
- "source documents no multi-step command sequences."
- "source does not state explicit confirmation/interlock procedures"
- "firmware version compatibility not stated (doc cover says Ver.1.00 but device firmware range unknown)."
- "serial cable pinout / TX-RX crossover not documented in source."
- "lamp wattage, power draw, voltage specs not in this control doc."
- "exact list of Networking-capable models vs base models for CR1='4' response not enumerated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
