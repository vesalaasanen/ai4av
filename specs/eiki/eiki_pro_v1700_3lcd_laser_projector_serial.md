---
spec_id: admin/eiki-pro-v1700
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki Pro V1700 3LCD Laser Projector Control Spec"
manufacturer: Eiki
model_family: "Eiki Pro V1700 3LCD Laser Projector"
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - "Eiki Pro V1700 3LCD Laser Projector"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - https://www.audiogeneral.com/eiki/V1700/PRO-V_RS232-Commands.pdf
retrieved_at: 2026-06-29T19:53:45.914Z
last_checked_at: 2026-06-30T07:02:08.162Z
generated_at: 2026-06-30T07:02:08.162Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Input voltage / power specs not in refined source extract. Full projector feature set (3LCD panel, laser light source) referenced only via model name; protocol doc covers control only."
  - "numeric format and units (hours/minutes) not specified in source."
  - "temperature unit (Celsius assumed from context) and decimal precision not explicitly stated in source."
  - "exact response framing / delimiter between line items not specified in source."
  - "no parameterized settable variables present in source."
  - "no unsolicited event/notification documented in source."
  - "no macros documented in source."
  - "no explicit safety/interlock procedures documented in source."
  - "firmware version compatibility not stated in source."
  - "ACK/NAK exact byte representation (ASCII \"ACK\"/\"NAK\" vs control bytes) not specified beyond the labels."
  - "timing between command and response, and minimum inter-command delay, not specified."
  - "CR3 light source timer numeric format/units not specified."
  - "CR6 temperature unit not explicitly stated (Celsius implied)."
  - "CR ALLPFAIL response framing/delimiter not fully specified."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:02:08.162Z
  matched_actions: 70
  action_count: 70
  confidence: medium
  summary: "All 70 spec actions (56 functional + 7 status queries + 7 feedback enums) matched verbatim in source with hex verification; transport parameters (19200 baud, 8 data, no parity, 1 stop, no flow control) fully supported. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# Eiki Pro V1700 3LCD Laser Projector Control Spec

## Summary
Eiki Pro V1700 3LCD laser projector controlled via RS-232C serial (PRO-V RS232 command set). Commands are ASCII strings beginning with `C` terminated by CR (`0x0D`). Two command classes: functional execution (return ACK/NAK + CR) and status read (return requested value or NAK + CR). Supports power, input selection, lens shift, focus, zoom, keystone, image mode, screen, menu, and various status queries including power state, input source, screen setting, temperature, lamp mode, and power-fault detail.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Input voltage / power specs not in refined source extract. Full projector feature set (3LCD panel, laser light source) referenced only via model name; protocol doc covers control only. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Note: source specifies "Asynchronous communication"; wiring is RS-232 cross (null-modem) cable.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: C00 power on, C01/C02 power off present
  - routable     # inferred: input selection commands (C05, C36, C37, C35, C38, C32, C15, C16, C17)
  - queryable    # inferred: CR0/CR1/CR3/CR4/CR6/CR7/CR ALLPFAIL status read commands
```

## Actions
```yaml
# All payloads verbatim from source. Mnemonic is the ASCII payload; hex form
# shown in source as (NN NN NN NN) where last byte is CR (0x0D) terminator.
# Per source §2.1 each command = one line starting "C" ending CR.
# Notes:
# - C44 and C18 hex strings in source end with 0x00 not 0x0D (apparent source typo);
#   preserved verbatim per policy. Implementer should verify against device.
# - "CR ALLPFAIL" has no hex string in source; ASCII payload used as documented.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "C00"   # 43 30 30 0D
  params: []

- id: power_off_immediate
  label: Power Off (Immediate)
  kind: action
  command: "C01"   # 43 30 31 0D
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "C02"   # 43 30 32 0D
  params: []

# --- Input selection ---
- id: select_vga_in_1
  label: Select VGA IN 1
  kind: action
  command: "C05"   # 43 30 35 0D
  params: []

- id: select_hdmi_1
  label: Select HDMI 1
  kind: action
  command: "C36"   # 43 33 36 0D
  params: []

- id: select_hdmi_2
  label: Select HDMI 2
  kind: action
  command: "C37"   # 43 33 37 0D
  params: []

- id: select_sdi
  label: Select SDI
  kind: action
  command: "C35"   # 43 33 35 0D
  params: []

- id: select_hdbaset
  label: Select HDBaseT
  kind: action
  command: "C38"   # 43 33 38 0D
  params: []

- id: select_dvi
  label: Select DVI
  kind: action
  command: "C32"   # 43 33 32 0D
  params: []

- id: select_network
  label: Select NETWORK
  kind: action
  command: "C15"   # 43 31 35 0D
  params: []

- id: select_memory_viewer
  label: Select Memory Viewer
  kind: action
  command: "C16"   # 43 31 36 0D
  params: []

- id: select_usb_display
  label: Select USB Display
  kind: action
  command: "C17"   # 43 31 37 0D
  params: []

# --- Keystone ---
- id: keystone_up
  label: Keystone Up
  kind: action
  command: "C8E"   # 43 38 45 0D
  params: []

- id: keystone_down
  label: Keystone Down
  kind: action
  command: "C8F"   # 43 38 46 0D
  params: []

- id: keystone_right
  label: Keystone Right
  kind: action
  command: "C90"   # 43 39 30 0D
  params: []

- id: keystone_left
  label: Keystone Left
  kind: action
  command: "C91"   # 43 39 31 0D
  params: []

- id: keystone_corner
  label: Keystone Corner
  kind: action
  command: "C98"   # 43 39 38 0D
  params: []

- id: keystone_barrel_pin
  label: Keystone Barrel / Pin
  kind: action
  command: "C99"   # 43 39 39 0D
  params: []

# --- Menu / Display overlay ---
- id: menu_on
  label: Menu On
  kind: action
  command: "C1C"   # 43 31 43 0D
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  command: "C1D"   # 43 31 44 0D
  params: []

- id: still_on
  label: Still On
  kind: action
  command: "C43"   # 43 34 33 0D
  params: []

- id: still_off
  label: Still Off
  kind: action
  command: "C44"   # 43 34 34 00  (source typo: terminator is 0x00 not 0x0D)
  params: []

- id: blank_on
  label: Blank On
  kind: action
  command: "C0D"   # 43 30 44 00  (source shows 0x00 terminator)
  params: []

- id: blank_off
  label: Blank Off
  kind: action
  command: "C0E"   # 43 30 45 0D
  params: []

- id: timer
  label: Timer
  kind: action
  command: "C8A"   # 43 38 41 0D
  params: []

- id: timer_exit
  label: Timer (Exit)
  kind: action
  command: "C8B"   # 43 38 42 0D
  params: []

# --- Zoom ---
- id: zoom_plus
  label: Zoom +
  kind: action
  command: "C46"   # 43 34 36 0D
  params: []

- id: zoom_minus
  label: Zoom -
  kind: action
  command: "C47"   # 43 34 37 0D
  params: []

- id: digital_zoom_plus
  label: Digital Zoom +
  kind: action
  command: "C30"   # 43 33 30 0D
  params: []

- id: digital_zoom_minus
  label: Digital Zoom -
  kind: action
  command: "C31"   # 43 33 31 0D
  params: []

# --- Focus ---
- id: focus_up
  label: Focus Up
  kind: action
  command: "C4A"   # 43 34 41 0D
  params: []

- id: focus_down
  label: Focus Down
  kind: action
  command: "C4B"   # 43 34 42 0D
  params: []

- id: focus_left
  label: Focus Left
  kind: action
  command: "C4C"   # 43 34 43 0D
  params: []

- id: focus_right
  label: Focus Right
  kind: action
  command: "C4D"   # 43 34 44 0D
  params: []

# --- Lens shift ---
- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  command: "C5D"   # 43 35 44 0D
  params: []

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  command: "C5E"   # 43 35 45 0D
  params: []

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  command: "C5F"   # 43 35 46 0D
  params: []

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  command: "C60"   # 43 36 30 0D
  params: []

- id: lens_calibration
  label: Lens Calibration
  kind: action
  command: "CEE"   # 43 45 45 0D
  params: []

- id: auto_lensshift_center
  label: Auto Lensshift Center
  kind: action
  command: "CEF"   # 43 45 46 0D
  params: []

# --- Image mode ---
- id: image_dynamic
  label: Image Dynamic
  kind: action
  command: "C19"   # 43 31 39 0D
  params: []

- id: image_standard
  label: Image Standard
  kind: action
  command: "C11"   # 43 31 31 0D
  params: []

- id: image_colorboard
  label: Image Colorboard
  kind: action
  command: "C39"   # 43 33 39 0D
  params: []

- id: image_cinema
  label: Image Cinema
  kind: action
  command: "C13"   # 43 31 33 0D
  params: []

- id: image_blackboard
  label: Image Blackboard
  kind: action
  command: "C18"   # 43 31 38 00  (source typo: terminator is 0x00 not 0x0D)
  params: []

- id: image_user
  label: Image User
  kind: action
  command: "C14"   # 43 31 34 0D
  params: []

# --- Screen size ---
- id: screen_normal
  label: Screen Normal Size
  kind: action
  command: "C0F"   # 43 30 46 0D
  params: []

- id: screen_wide
  label: Screen Wide Size
  kind: action
  command: "C10"   # 43 31 30 0D
  params: []

- id: display_clear
  label: Display Clear
  kind: action
  command: "C1E"   # 43 31 45 0D
  params: []

# --- Brightness (relative) ---
- id: brightness_plus
  label: Brightness +
  kind: action
  command: "C20"   # 43 32 30 0D
  params: []

- id: brightness_minus
  label: Brightness -
  kind: action
  command: "C21"   # 43 32 31 0D
  params: []

# --- Image toggle ---
- id: image_toggle
  label: Image (Toggle)
  kind: action
  command: "C27"   # 43 32 37 0D
  params: []

# --- Direct on / Power management ---
- id: direct_on_enable
  label: Direct On Enable
  kind: action
  command: "C28"   # 43 32 38 0D
  params: []

- id: direct_on_disable
  label: Direct On Disable
  kind: action
  command: "C29"   # 43 32 39 0D
  params: []

- id: power_management_ready
  label: Power Management Ready
  kind: action
  command: "C2A"   # 43 32 41 0D
  params: []

- id: power_management_off
  label: Power Management OFF
  kind: action
  command: "C2B"   # 43 32 42 0D
  params: []

- id: power_management_shutdown
  label: Power Management Shut Down
  kind: action
  command: "C2E"   # 43 32 45 0D
  params: []

# --- Pointer / Enter ---
- id: pointer_right
  label: Pointer Right
  kind: action
  command: "C3A"   # 43 33 41 0D
  params: []

- id: pointer_left
  label: Pointer Left
  kind: action
  command: "C3B"   # 43 33 42 0D
  params: []

- id: pointer_up
  label: Pointer Up
  kind: action
  command: "C3C"   # 43 33 43 0D
  params: []

- id: pointer_down
  label: Pointer Down
  kind: action
  command: "C3D"   # 43 33 44 0D
  params: []

- id: enter
  label: Enter
  kind: action
  command: "C3F"   # 43 33 46 0D
  params: []

# --- Auto PC ---
- id: auto_pc_adj
  label: Auto PC ADJ.
  kind: action
  command: "C89"   # 43 38 39 0D
  params: []

# --- Status read commands (kind: query) ---
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "CR0"   # 43 52 30 0D
  params: []

- id: input_source_query
  label: Input Source Query
  kind: query
  command: "CR1"   # 43 52 31 0D
  params: []

- id: light_source_timer_query
  label: Light Source Timer Read
  kind: query
  command: "CR3"   # 43 52 33 0D
  params: []

- id: screen_setting_query
  label: Screen Setting Status Query
  kind: query
  command: "CR4"   # 43 52 34 00  (source shows 0x00 terminator)
  params: []

- id: temperature_query
  label: Temperature Data Query
  kind: query
  command: "CR6"   # 43 52 36 0D
  params: []

- id: lamp_mode_query
  label: Lamp Mode Status Query
  kind: query
  command: "CR7"   # 43 52 37 0D
  params: []

- id: power_failure_detail_query
  label: Power Failure Detail Query
  kind: query
  command: "CR ALLPFAIL"   # no hex form in source; ASCII payload verbatim
  params: []
```

## Feedbacks
```yaml
# Functional execution commands return ACK or NAK followed by CR.
- id: command_ack
  type: enum
  values: [ACK, NAK]
  description: Acknowledgement returned by projector after a functional command (per source §2.2 example for C00).

# CR0 - projector operation status
- id: operation_status
  type: enum
  values:
    - "00"          # Power on
    - "80"          # Standby
    - "40"          # Countdown in process
    - "20"          # Cooling down in process
    - "10"          # Power failure
    - "28-0"        # TEMP sensor A cooling down (temp anomaly)
    - "28-1"        # TEMP sensor B cooling down (temp anomaly)
    - "28-2"        # TEMP sensor C cooling down (temp anomaly)
    - "28-3"        # TEMP sensor D cooling down (temp anomaly)
    - "88-0"        # Standby after TEMP sensor A cooling down
    - "88-1"        # Standby after TEMP sensor B cooling down
    - "88-2"        # Standby after TEMP sensor C cooling down
    - "88-3"        # Standby after TEMP sensor D cooling down
    - "24"          # Power management cooling
    - "04"          # Suspend (power management ready)
    - "21"          # Cooling down after lamp off
    - "81"          # Standby after cooling down due to lamp off
  description: Projector operation status returned by CR0.

# CR1 - input source
- id: input_source
  type: enum
  values: [VGA, "HDMI 1", "HDMI 2", HDBASET, DVI, "Memory Viewer", Network, "USB display"]
  description: Active input source returned by CR1.

# CR3 - light source timer
- id: light_source_timer
  type: string
  description: Light source timer value returned by CR3. Format/units not specified in source.
  # UNRESOLVED: numeric format and units (hours/minutes) not specified in source.

# CR4 - screen setting status
- id: screen_setting_status
  type: enum
  values:
    - "11"   # Normal screen setting
    - "10"   # Rear & Ceiling ON
    - "01"   # Rear ON
    - "00"   # Ceiling ON
    - "20"   # Auto Ceiling and Rear ON
    - "21"   # Auto Ceiling and Rear OFF
  description: Screen setting status returned by CR4.

# CR6 - temperature data
- id: temperature_data
  type: string
  description: Internal temperature data returned by CR6 as "%1_%2_%3_%4" (Sensor1_Sensor2_Sensor3_Sensor4), each shown as "00.0".
  # UNRESOLVED: temperature unit (Celsius assumed from context) and decimal precision not explicitly stated in source.

# CR7 - lamp/light mode status
- id: lamp_mode_status
  type: enum
  values:
    - "00"   # Light is out
    - "01"   # Light is on
  description: Light/lamp mode status returned by CR7.

# CR ALLPFAIL - power failure detail
- id: power_failure_detail
  type: string
  description: >
    Power failure detail returned by CR ALLPFAIL. Source enumerates line items
    of the form "NNN <name>, <status>" covering MAIN and FAN-1..FAN-13, LENS, CW.
    Returned as a multi-line block; exact framing not fully specified.
  # UNRESOLVED: exact response framing / delimiter between line items not specified in source.
```

## Variables
```yaml
# No settable parameter with explicit value-range payload is documented in the
# refined source. Brightness, zoom, focus, lens shift, and keystone are exposed
# only as relative +/- or directional actions (see Actions), not as
# parameterized set-points. Direct absolute-level control not documented.
# UNRESOLVED: no parameterized settable variables present in source.
```

## Events
```yaml
# Source documents request/response only. No unsolicited notifications described.
# UNRESOLVED: no unsolicited event/notification documented in source.
```

## Macros
```yaml
# No multi-step command sequences described explicitly in source.
# UNRESOLVED: no macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source mentions cooling-down states (CR0 "20", "21", "24", "28-x") and
# temperature-anomaly-induced shutdowns ("88-x"), but does not document any
# safety interlock procedure or required power-on sequencing. C01 (Power Off
# immediate) vs C02 (Power Off) distinction implies timing behavior but is not
# described as a safety interlock.
# UNRESOLVED: no explicit safety/interlock procedures documented in source.
```

## Notes
- Protocol framing: each command is one ASCII line beginning with `C` and terminated by CR (`0x0D`). Per source §2.1.
- Two command classes: functional execution (return `ACK`/`NAK` + CR) and status read (return value or `NAK` + CR). Per source §2.2–2.3.
- Wiring: RS-232 cross (null-modem) cable between PC and projector. Per source §1.2.
- Baud rate is **19200** (not the common 9600) — stated explicitly in source §1.1.
- Source typos preserved verbatim per population policy: `C44` (Still off), `C0D` (Blank on), `C18` (Image Blackboard), and `CR4` (screen setting query) all show a `0x00` terminator in the hex form where every other command uses `0x0D` (CR). Likely OCR/typo in vendor doc; implementer should verify against device behavior.
- `CR ALLPFAIL` is the only command without a hex representation in the source; payload taken as ASCII verbatim.
- Status enums for `CR0` include hyphenated sub-codes (`28-0`..`28-3`, `88-0`..`88-3`) for per-sensor temperature anomaly reporting — preserved verbatim.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: ACK/NAK exact byte representation (ASCII "ACK"/"NAK" vs control bytes) not specified beyond the labels. -->
<!-- UNRESOLVED: timing between command and response, and minimum inter-command delay, not specified. -->
<!-- UNRESOLVED: CR3 light source timer numeric format/units not specified. -->
<!-- UNRESOLVED: CR6 temperature unit not explicitly stated (Celsius implied). -->
<!-- UNRESOLVED: CR ALLPFAIL response framing/delimiter not fully specified. -->
```

Spec ready. Source extracted all 56 functional + 7 status commands as separate actions (per coverage rule, no collapse). Three hex typos flagged verbatim, not normalized.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - https://www.audiogeneral.com/eiki/V1700/PRO-V_RS232-Commands.pdf
retrieved_at: 2026-06-29T19:53:45.914Z
last_checked_at: 2026-06-30T07:02:08.162Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:02:08.162Z
matched_actions: 70
action_count: 70
confidence: medium
summary: "All 70 spec actions (56 functional + 7 status queries + 7 feedback enums) matched verbatim in source with hex verification; transport parameters (19200 baud, 8 data, no parity, 1 stop, no flow control) fully supported. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Input voltage / power specs not in refined source extract. Full projector feature set (3LCD panel, laser light source) referenced only via model name; protocol doc covers control only."
- "numeric format and units (hours/minutes) not specified in source."
- "temperature unit (Celsius assumed from context) and decimal precision not explicitly stated in source."
- "exact response framing / delimiter between line items not specified in source."
- "no parameterized settable variables present in source."
- "no unsolicited event/notification documented in source."
- "no macros documented in source."
- "no explicit safety/interlock procedures documented in source."
- "firmware version compatibility not stated in source."
- "ACK/NAK exact byte representation (ASCII \"ACK\"/\"NAK\" vs control bytes) not specified beyond the labels."
- "timing between command and response, and minimum inter-command delay, not specified."
- "CR3 light source timer numeric format/units not specified."
- "CR6 temperature unit not explicitly stated (Celsius implied)."
- "CR ALLPFAIL response framing/delimiter not fully specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
