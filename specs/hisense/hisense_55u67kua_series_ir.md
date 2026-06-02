---
spec_id: admin/hisense-55u67kua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 55U67KUA Series Control Spec"
manufacturer: HiSense
model_family: "55U67KUA Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "55U67KUA Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-01T20:43:32.341Z
last_checked_at: 2026-06-01T21:44:45.768Z
generated_at: 2026-06-01T21:44:45.768Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SPKM
  - B2BM
  - USBM
  - PSHF
  - "exact model list within 55U67KUA Series not stated in source"
  - "source document truncated at end — additional POIS parameter values and possibly more commands may exist beyond what was captured"
  - "source truncated - additional POIS values (HDMI, VGA, etc.) likely exist"
  - "return values partially documented due to truncation"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "POIS command truncated — additional input values beyond Component may exist"
  - "possible additional commands exist in the truncated portion of the source document"
  - "no power state query command found; only power-on-command enable/disable query (PWRE) documented"
verification:
  verdict: verified
  checked_at: 2026-06-01T21:44:45.768Z
  matched_actions: 69
  action_count: 69
  confidence: medium
  summary: "All 69 spec actions match source verbatim with correct shapes and transport; 4 source-only commands (SPKM, B2BM, USBM, PSHF) fall within the 5-command tolerance and ratio is 38/42=0.905 above the 0.9 floor. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# HiSense 55U67KUA Series Control Spec

## Summary
HiSense Prosumer TV controllable via RS-232 serial (DB9) and discrete IR (Pronto CCF codes). This spec covers the RS-232 serial command protocol with fixed-length ASCII frames. The source also documents ~40 discrete IR hex codes for IR blaster use. Serial must be enabled in the Custom Install menu before control is possible.

<!-- UNRESOLVED: exact model list within 55U67KUA Series not stated in source -->
<!-- UNRESOLVED: source document truncated at end — additional POIS parameter values and possibly more commands may exist beyond what was captured -->

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
  code: ascii
  connector: DB9 D-sub female chassis mount
  pinout:
    1: N/C
    2: RXD
    3: TXD
    4: DTR
    5: GND
    6: DSR
    7: RTS
    8: CTS
    9: Power Input
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # POWR on/off/standby
  - queryable   # extensive query commands
  - levelable   # VOLM, BRIT, CONT, BKLV, SHRP, TINT, COLR with 0-100 ranges
  - routable    # INPT selects TV, AV, HDMI1-4, Component, VGA
```

## Actions
```yaml
# Frame format (all actions):
#   Set:     S{client_id}{COMMAND}{DATA}{CHECKSUM}\r
#   Query:   Q{client_id}{COMMAND}????{CHECKSUM}\r
#   Response: {client_id}:{ACK}{DATA}{CHECKSUM}\r
#
# client_id: 3-char hex = last 3 bytes of Ethernet MAC (Smart TV),
#            or menu-selected ID (Feature TV), or "ALL" for broadcast.
# COMMAND:   4-char ASCII mnemonic (case-sensitive).
# DATA:      4-char ASCII parameter.
# CHECKSUM:  1 byte - 8-bit checksum; sum of all bytes including checksum = 0 (mod 256).
# \r = 0x0D.
# Common ACK values: OKAY, EROR, WAIT.

# ── Power Control ──

- id: set_power_on_command_enable
  label: Set RS-232 Power On Command Enable
  kind: action
  command: "PWRE{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Disable RS-232 Remote Power On
        "0001": Enable RS-232 Remote Power On
  notes: Must enable before remote power-on via RS-232 works.

- id: query_power_on_command_setting
  label: Query RS-232 Power On Command Setting
  kind: query
  command: "PWRE????"
  params: []
  response:
    type: enum
    values:
      "0": Disabled
      "1": Enabled
  notes: Not available in STANDBY mode.

- id: set_power
  label: Set Power On/Off
  kind: action
  command: "POWR{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Standby
        "0001": Power On

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  command: "PBTN{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": AC Only
        "0001": All

- id: query_power_off_control_mode
  label: Query Power Off Control Mode
  kind: query
  command: "PBTN????"
  params: []
  response:
    type: enum
    values:
      "0": AC Only
      "1": All

- id: set_power_on_input_selection
  label: Set Power On Input Selection
  kind: action
  command: "POIS{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Last
        "0001": Air
        "0002": AV
        "0003": Component
  # UNRESOLVED: source truncated - additional POIS values (HDMI, VGA, etc.) likely exist

- id: query_power_on_input_selection
  label: Query Power On Input Selection
  kind: query
  command: "POIS????"
  params: []
  # UNRESOLVED: return values partially documented due to truncation

# ── Input Source ──

- id: set_input_source
  label: Set Input Source
  kind: action
  command: "INPT{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Cycle (change one at a time)
        "0001": TV
        "0004": AV
        "0003": Component
        "0009": HDMI1
        "0010": HDMI2
        "0011": HDMI3
        "0012": HDMI4
        "0006": VGA

- id: query_input_source
  label: Query Current Input Source
  kind: query
  command: "INPT????"
  params: []
  response:
    type: enum
    values:
      "1": TV
      "4": AV
      "3": Component
      "9": HDMI1
      "10": HDMI2
      "11": HDMI3
      "12": HDMI4
      "6": VGA

- id: set_input_mode
  label: Set Input Mode
  kind: action
  command: "INPM{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Locked
        "0001": Selectable
        "0002": AC Reset
        "0003": Standby Reset

- id: query_input_mode
  label: Query Input Mode
  kind: query
  command: "INPM????"
  params: []
  response:
    type: enum
    values:
      "0": Locked
      "1": Selectable
      "2": AC Reset
      "3": Standby Reset

# ── Picture Settings ──

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "PMOD{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Standard
        "0002": Vivid
        "0003": EnergySaving
        "0004": Theater
        "0005": Game
        "0006": Sport

- id: query_picture_mode
  label: Query Picture Mode
  kind: query
  command: "PMOD????"
  params: []
  response:
    type: enum
    values:
      "0": Standard
      "2": Vivid
      "3": EnergySaving
      "4": Theater
      "5": Game
      "6": Sport

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "BRIT{value}"
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      format: "4-digit zero-padded (0000-0100)"

- id: query_brightness
  label: Query Brightness
  kind: query
  command: "BRIT????"
  params: []
  response:
    type: integer
    min: 0
    max: 100

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "CONT{value}"
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      format: "4-digit zero-padded (0000-0100)"

- id: query_contrast
  label: Query Contrast
  kind: query
  command: "CONT????"
  params: []
  response:
    type: integer
    min: 0
    max: 100

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  command: "COLR{value}"
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      format: "4-digit zero-padded (0000-0100)"

- id: query_color_saturation
  label: Query Color Saturation
  kind: query
  command: "COLR????"
  params: []
  response:
    type: integer
    min: 0
    max: 100

- id: set_tint
  label: Set Tint
  kind: action
  command: "TINT{value}"
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      format: "4-digit zero-padded (0000-0100)"

- id: query_tint
  label: Query Tint
  kind: query
  command: "TINT????"
  params: []
  response:
    type: integer
    min: 0
    max: 100

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "SHRP{value}"
  params:
    - name: value
      type: integer
      min: 0
      max: 20
      format: "4-digit zero-padded (0000-0020)"

- id: query_sharpness
  label: Query Sharpness
  kind: query
  command: "SHRP????"
  params: []
  response:
    type: integer
    min: 0
    max: 20

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "BKLV{value}"
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      format: "4-digit zero-padded (0000-0100)"

- id: query_backlight
  label: Query Backlight
  kind: query
  command: "BKLV????"
  params: []
  response:
    type: integer
    min: 0
    max: 100

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: "CTEM{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": High
        "0002": Middle
        "0003": Mid-Low
        "0004": Low

- id: query_color_temperature
  label: Query Color Temperature
  kind: query
  command: "CTEM????"
  params: []
  response:
    type: enum
    values:
      "0": High
      "2": Middle
      "3": Mid-Low
      "4": Low

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "ASPT{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Auto
        "0002": Normal
        "0003": Zoom
        "0004": Wide
        "0005": Direct
        "0006": 1-to-1 Pixel Map
        "0007": Panoramic
        "0008": Cinema

- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "ASPT????"
  params: []
  response:
    type: enum
    values:
      "0": Auto
      "2": Normal
      "3": Zoom
      "4": Wide
      "5": Direct
      "6": 1-to-1 Pixel Map
      "7": Panoramic
      "8": Cinema

- id: set_overscan
  label: Set Overscan
  kind: action
  command: "OVSN{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": On
        "0002": Off

- id: query_overscan
  label: Query Overscan
  kind: query
  command: "OVSN????"
  params: []
  response:
    type: enum
    values:
      "0": On
      "2": Off

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  command: "RSTP1000"
  params: []

# ── Audio Settings ──

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: "AMOD{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Standard
        "0002": Theater
        "0003": Music
        "0004": Speech
        "0005": Late Night

- id: query_sound_mode
  label: Query Sound Mode
  kind: query
  command: "AMOD????"
  params: []
  response:
    type: enum
    values:
      "0": Standard
      "2": Theater
      "3": Music
      "4": Speech
      "5": Late Night

- id: set_volume
  label: Set Volume
  kind: action
  command: "VOLM{value}"
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      format: "4-digit zero-padded (0000-0100)"

- id: query_volume
  label: Query Volume
  kind: query
  command: "VOLM????"
  params: []
  response:
    type: integer
    min: 0
    max: 100

- id: set_mute
  label: Set Mute
  kind: action
  command: "MUTE{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Mute Off
        "0001": Mute On

- id: query_mute
  label: Query Mute Status
  kind: query
  command: "MUTE????"
  params: []
  response:
    type: enum
    values:
      "0": Not Muted
      "1": Muted

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  command: "ASPK{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Off
        "0002": On

- id: query_tv_speaker
  label: Query TV Speaker
  kind: query
  command: "ASPK????"
  params: []
  response:
    type: enum
    values:
      "0": Off
      "2": On

- id: set_volume_range
  label: Set Maximum Volume Level
  kind: action
  command: "MAVL{value}"
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      format: "4-digit zero-padded (0000-0100)"

- id: query_volume_range
  label: Query Maximum Volume Level
  kind: query
  command: "MAVL????"
  params: []
  response:
    type: integer
    min: 0
    max: 100

- id: set_volume_control
  label: Set Volume Control Mode
  kind: action
  command: "SVOL{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Locked
        "0001": Last Volume
        "0002": AC Reset
        "0003": Standby Reset

- id: query_volume_control
  label: Query Volume Control Mode
  kind: query
  command: "SVOL????"
  params: []
  response:
    type: enum
    values:
      "0": Locked
      "1": Last Volume
      "2": AC Reset
      "3": Standby Reset

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  command: "VLFL{value}"
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      format: "4-digit zero-padded (0000-0100)"

- id: query_volume_locked_level
  label: Query Volume Locked Level
  kind: query
  command: "VLFL????"
  params: []
  response:
    type: integer
    min: 0
    max: 100

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  command: "RSTA2000"
  params: []

# ── Tuner / Channel ──

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  command: "TUNR{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Antenna
        "0002": Cable

- id: query_tuner_mode
  label: Query Tuner Mode
  kind: query
  command: "TUNR????"
  params: []
  response:
    type: enum
    values:
      "0": Antenna
      "2": Cable

- id: automatic_channel_search
  label: Automatic Channel Search
  kind: action
  command: "TSCN0001"
  params: []

- id: channel_change
  label: Channel Up/Down
  kind: action
  command: "CHAN{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Channel Down
        "0001": Channel Up

# ── Captions ──

- id: set_caption
  label: Set Caption Control
  kind: action
  command: "CC##{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Off
        "0002": On
        "0003": CC On When Mute

- id: query_caption
  label: Query Caption Control
  kind: query
  command: "CC##????"
  params: []
  response:
    type: enum
    values:
      "0": Off
      "2": On
      "3": CC On When Mute

# ── OSD / Language ──

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: "LANG{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": English
        "0002": Español
        "0003": Français

- id: query_osd_language
  label: Query OSD Language
  kind: query
  command: "LANG????"
  params: []
  response:
    type: enum
    values:
      "0": English
      "2": Español
      "3": Français

- id: set_osd_mode
  label: Set OSD Display Mode
  kind: action
  command: "OSD#{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Enable
        "0001": Disable

- id: query_osd_mode
  label: Query OSD Display Mode
  kind: query
  command: "OSD#????"
  params: []
  response:
    type: enum
    values:
      "0": Enable
      "1": Disable

# ── Standby LED ──

- id: set_standby_led
  label: Set Standby LED
  kind: action
  command: "PLED{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Off
        "0002": On

- id: query_standby_led
  label: Query Standby LED
  kind: query
  command: "PLED????"
  params: []
  response:
    type: enum
    values:
      "0": Off
      "2": On

# ── System / Lock ──

- id: set_remote_key_lock
  label: Set Remote Key Lock
  kind: action
  command: "RMOT{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Enable
        "0001": Disable
        "0002": Partial

- id: query_remote_key_lock
  label: Query Remote Key Lock
  kind: query
  command: "RMOT????"
  params: []
  response:
    type: enum
    values:
      "0": Enable
      "1": Disable
      "2": Partial

- id: set_panel_key_lock
  label: Set Panel Key Lock
  kind: action
  command: "PANL{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Enable
        "0001": Disable

- id: query_panel_key_lock
  label: Query Panel Key Lock
  kind: query
  command: "PANL????"
  params: []
  response:
    type: enum
    values:
      "0": Enable
      "1": Disable

- id: set_menu_access
  label: Set Menu Access
  kind: action
  command: "MENU{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Enable
        "0001": Disable

- id: query_menu_access
  label: Query Menu Access
  kind: query
  command: "MENU????"
  params: []
  response:
    type: enum
    values:
      "0": Enable
      "1": Disable

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  command: "AVMN{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Disable
        "0001": Enable

- id: query_av_setting_menu
  label: Query AV Setting Menu
  kind: query
  command: "AVMN????"
  params: []
  response:
    type: enum
    values:
      "0": Disable
      "1": Enable

- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  command: "RSET9999"
  params: []

# ── Remote Button Simulator ──

- id: simulate_remote_button
  label: Simulate Remote Button
  kind: action
  command: "BTTN{code}"
  params:
    - name: code
      type: enum
      values:
        "1000": Digit 0
        "1001": Digit 1
        "1002": Digit 2
        "1003": Digit 3
        "1004": Digit 4
        "1005": Digit 5
        "1006": Digit 6
        "1007": Digit 7
        "1008": Digit 8
        "1009": Digit 9
        "1010": Dash
        "1012": Power
        "1015": Fast Rewind
        "1016": Play
        "1017": Fast Forward
        "1018": Pause
        "1019": Previous
        "1020": Stop
        "1021": Next
        "1023": HiMedia
        "1024": Sleep
        "1027": CC
        "1031": Mute
        "1032": Volume Down
        "1033": Volume Up
        "1034": Channel Up
        "1035": Channel Down
        "1036": Input
        "1038": Menu
        "1039": HiSmart (Connected Home)
        "1040": OK/Enter
        "1041": Up
        "1042": Down
        "1043": Left
        "1044": Right
        "1045": Back
        "1046": Exit
        "1050": Red Button
        "1051": Green Button
        "1052": Blue Button
        "1053": Yellow Button
        "1054": MTS/SAP
        "1055": Live TV
```

## Feedbacks
```yaml
# All query actions above return their response via the ACK frame:
#   {client_id}:{ACK}{DATA}{CHECKSUM}\r
# ACK values: OKAY (success), EROR (error), WAIT (busy).
# See each query action's "response" field for return value semantics.
```

## Variables
```yaml
# Continuous settable parameters are captured as parameterized Actions above:
# VOLM (0-100), BRIT (0-100), CONT (0-100), COLR (0-100), TINT (0-100),
# BKLV (0-100), SHRP (0-20), MAVL (0-100), VLFL (0-100).
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Protocol is case-sensitive.
- Checksum: 8-bit sum of all bytes including the checksum byte itself equals 0 (mod 256). Implementers must compute per-frame.
- Client ID: last 3 hex chars of the TV's Ethernet MAC address (Smart TV), menu-selected value (Feature TV), or `ALL` for broadcast to all TVs on the serial bus.
- RS-232 serial port must be enabled in the Custom Install menu: power on TV, press Quick Settings, then enter `7310` on the numeric keys, select Custom Installation → Enable.
- For RS-232 power-on from standby, set Power On Command to Enable (PWRE0001) before exiting Custom Install menu.
- Source also documents ~40 discrete IR codes in Pronto CCF format (custom code `04 FB`) covering power, input selection, aspect ratio, digits, navigation, volume, channel, PIP, and transport controls. These require an IR blaster and are not serial commands.
- DB9 pin 9 provides power input (for serial adapter power).
- No power state query (POWR????) documented — only PWRE query (enable/disable setting) exists.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: POIS command truncated — additional input values beyond Component may exist -->
<!-- UNRESOLVED: possible additional commands exist in the truncated portion of the source document -->
<!-- UNRESOLVED: no power state query command found; only power-on-command enable/disable query (PWRE) documented -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-01T20:43:32.341Z
last_checked_at: 2026-06-01T21:44:45.768Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T21:44:45.768Z
matched_actions: 69
action_count: 69
confidence: medium
summary: "All 69 spec actions match source verbatim with correct shapes and transport; 4 source-only commands (SPKM, B2BM, USBM, PSHF) fall within the 5-command tolerance and ratio is 38/42=0.905 above the 0.9 floor. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SPKM
- B2BM
- USBM
- PSHF
- "exact model list within 55U67KUA Series not stated in source"
- "source document truncated at end — additional POIS parameter values and possibly more commands may exist beyond what was captured"
- "source truncated - additional POIS values (HDMI, VGA, etc.) likely exist"
- "return values partially documented due to truncation"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "POIS command truncated — additional input values beyond Component may exist"
- "possible additional commands exist in the truncated portion of the source document"
- "no power state query command found; only power-on-command enable/disable query (PWRE) documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
