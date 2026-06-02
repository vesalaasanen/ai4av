---
spec_id: admin/hisense-65u8k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 65U8K Series Control Spec"
manufacturer: Hisense
model_family: "65U8K Series"
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - "65U8K Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:49.212Z
last_checked_at: 2026-05-14T18:17:16.525Z
generated_at: 2026-05-14T18:17:16.525Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document title is \"RS-232/IR Protocol for Hisense® Prosumer TV\" — no TCP/IP transport is described. The input metadata stated \"Known protocol: TCP/IP\" but the source contains no TCP port, no IP addressing, and no socket-level protocol. This spec reflects serial-only control as stated in the source."
  - "Specific model numbers were blank in the source \"Models\" section; entity ID supplied by caller."
  - "Power-on via RS-232 requires the TV's Custom Install menu to be enabled (code 7310); this is a setup prerequisite, not a command sequence."
  - "Power-On Input Selection (POIS) command was partially visible in source (truncated)."
  - "No unsolicited notification mechanism described in source."
  - "No multi-step macro sequences described in source."
  - "Source document \"Models\" section was blank; specific model numbers that implement this protocol (beyond \"Prosumer TV\" and \"65U8K Series\" from entity metadata) are not stated."
  - "Power-On Input Selection (POIS) command table was truncated in the source excerpt and could not be fully reconstructed."
  - "Firmware version compatibility not stated in source."
  - "RS-232 multi-drop wiring topology (daisy-chain vs. star) not described in source."
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.525Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 104 spec actions match literally to source commands; all transport parameters verified verbatim in RS-232C specification section. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Hisense 65U8K Series Control Spec

## Summary

The Hisense 65U8K Series is a prosumer flat-panel TV controllable over RS-232 (DB9 serial) using a fixed-length ASCII command protocol with 8-bit checksum. This spec covers the full RS-232 command and query set including power, input selection, picture/audio settings, tuner, and remote-button simulation. Discrete IR (Pronto CCF) codes are also documented in the source but are not modeled here as machine-actionable commands.

<!-- UNRESOLVED: Source document title is "RS-232/IR Protocol for Hisense® Prosumer TV" — no TCP/IP transport is described. The input metadata stated "Known protocol: TCP/IP" but the source contains no TCP port, no IP addressing, and no socket-level protocol. This spec reflects serial-only control as stated in the source. -->
<!-- UNRESOLVED: Specific model numbers were blank in the source "Models" section; entity ID supplied by caller. -->
<!-- UNRESOLVED: Power-on via RS-232 requires the TV's Custom Install menu to be enabled (code 7310); this is a setup prerequisite, not a command sequence. -->

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
  connector: DB9  # female chassis mount on TV; RS-232C compliant
  encoding: ASCII
auth:
  type: none  # inferred: no auth procedure in source
```

### Frame Format

Commands are fixed-length, case-sensitive ASCII strings terminated by Carriage Return (0x0D):

```
Set:   S[CLIENT_ID:3][COMMAND:4][DATA:4][CHECKSUM:1][CR]
Query: Q[CLIENT_ID:3][COMMAND:4]????[CHECKSUM:1][CR]
ACK:   [CLIENT_ID:3]:OKAY[DATA:4][CHECKSUM:1][CR]
       [CLIENT_ID:3]:EROR[DATA:4][CHECKSUM:1][CR]
       [CLIENT_ID:3]:WAIT[DATA:4][CHECKSUM:1][CR]
```

- **CLIENT_ID**: Last 3 hex digits of TV's Ethernet MAC address for unicast; `ALL` for broadcast to all TVs on RS-232 bus.
- **CHECKSUM**: 8-bit value such that the sum of all bytes in the full command string (including checksum byte) equals zero (mod 256).
- Padding character for unused data bytes: `#` (0x23).
- Query data field is always `????`.

## Traits

```yaml
- powerable       # inferred from POWR set/query commands
- queryable       # inferred from extensive Q-prefix query commands throughout
- routable        # inferred from INPT input selection commands
- levelable       # inferred from VOLM, BRIT, CONT, COLR, TINT, SHRP, BKLV numeric-range commands
```

## Actions

```yaml
- id: power_standby
  label: Set Standby
  kind: action
  command: "POWR0000"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "POWR0001"
  params: []

- id: rs232_power_enable
  label: Enable RS-232 Remote Power On
  kind: action
  command: "PWRE0001"
  note: "Must be set to allow RS-232 to wake TV from standby. Also requires Custom Install menu to have Custom Installation set to Enable."
  params: []

- id: rs232_power_disable
  label: Disable RS-232 Remote Power On
  kind: action
  command: "PWRE0000"
  params: []

- id: set_input
  label: Set Input Source
  kind: action
  command: "INPT{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": cycle
        "0001": TV
        "0003": Component
        "0004": AV
        "0006": VGA
        "0009": HDMI1
        "0010": HDMI2
        "0011": HDMI3
        "0012": HDMI4

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

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "BRIT{value}"
  params:
    - name: value
      type: integer
      range: [0, 100]
      format: "4-digit zero-padded decimal (e.g. 0050)"

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "CONT{value}"
  params:
    - name: value
      type: integer
      range: [0, 100]
      format: "4-digit zero-padded decimal"

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  command: "COLR{value}"
  params:
    - name: value
      type: integer
      range: [0, 100]
      format: "4-digit zero-padded decimal"

- id: set_tint
  label: Set Tint
  kind: action
  command: "TINT{value}"
  params:
    - name: value
      type: integer
      range: [0, 100]
      format: "4-digit zero-padded decimal"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "SHRP{value}"
  params:
    - name: value
      type: integer
      range: [0, 20]
      format: "4-digit zero-padded decimal"

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
        "0006": 1-to-1pixel
        "0007": Panoramic
        "0008": Cinema

- id: set_overscan
  label: Set Overscan
  kind: action
  command: "OVSN{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": on
        "0002": off

- id: reset_picture
  label: Reset Picture Settings
  kind: action
  command: "RSTP1000"
  params: []

- id: set_color_temp
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

- id: set_backlight
  label: Set Backlight Value
  kind: action
  command: "BKLV{value}"
  params:
    - name: value
      type: integer
      range: [0, 100]
      format: "4-digit zero-padded decimal"

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
        "0005": Late_night

- id: reset_audio
  label: Reset Audio Settings
  kind: action
  command: "RSTA2000"
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  command: "VOLM{value}"
  params:
    - name: value
      type: integer
      range: [0, 100]
      format: "4-digit zero-padded decimal"

- id: set_mute
  label: Set Mute
  kind: action
  command: "MUTE{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": off
        "0001": on

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  command: "ASPK{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": off
        "0002": on

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

- id: auto_channel_scan
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
        "0000": down
        "0001": up

- id: set_caption
  label: Set Closed Caption
  kind: action
  command: "CC##{value}"
  note: "Command uses literal '##' characters in position 3-4 of command field"
  params:
    - name: value
      type: enum
      values:
        "0000": off
        "0002": on
        "0003": on_when_mute

- id: factory_reset
  label: Restore Factory Settings
  kind: action
  command: "RSET9999"
  params: []

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

- id: set_standby_led
  label: Set Standby LED
  kind: action
  command: "PLED{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": off
        "0002": on

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  command: "PBTN{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": AC_ONLY
        "0001": ALL

- id: set_volume_range
  label: Set Volume Range (max)
  kind: action
  command: "MAVL{value}"
  params:
    - name: value
      type: integer
      range: [0, 100]
      format: "4-digit zero-padded decimal"

- id: set_volume_control_mode
  label: Set Volume Control Mode
  kind: action
  command: "SVOL{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": LOCKED
        "0001": LAST_VOLUME
        "0002": AC_RESET
        "0003": STANDBY_RESET

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  command: "VLFL{value}"
  params:
    - name: value
      type: integer
      range: [0, 100]
      format: "4-digit zero-padded decimal"

- id: set_remote_key
  label: Set Remote Key Mode
  kind: action
  command: "RMOT{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": ENABLE
        "0001": DISABLE
        "0002": PARTIAL

- id: set_panel_key
  label: Set Panel Key Mode
  kind: action
  command: "PANL{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": ENABLE
        "0001": DISABLE

- id: set_menu_access
  label: Set Menu Access
  kind: action
  command: "MENU{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": ENABLE
        "0001": DISABLE

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  command: "AVMN{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": DISABLE
        "0001": ENABLE

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  command: "OSD#{value}"
  note: "Command uses literal '#' in position 4 of command field"
  params:
    - name: value
      type: enum
      values:
        "0000": ENABLE
        "0001": DISABLE

- id: set_input_mode
  label: Set Input Mode
  kind: action
  command: "INPM{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": LOCKED
        "0001": SELECTABLE
        "0002": AC_RESET
        "0003": STANDBY_RESET

- id: simulate_button
  label: Simulate Remote/Panel Button Press
  kind: action
  command: "BTTN{button_code}"
  note: "Button codes have a '1' prefix. See Notes section for full code table."
  params:
    - name: button_code
      type: string
      description: "4-character button code (e.g. 1012=POWER, 1032=VOL-, 1033=VOL+, 1034=CH+, 1035=CH-, 1040=OK, 1041=UP, 1042=DOWN, 1043=LEFT, 1044=RIGHT, 1045=BACK, 1046=EXIT, 1036=INPUT, 1031=MUTE, 1038=MENU, 1000-1009=digits 0-9)"
- id: set_power_on_input
  label: Set Power On Input Selection
  kind: action
  command: "POIS{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": LAST
        "0001": Air
        "0002": AV
        "0003": Component
        "0004": VGA
        "0005": HDMI1
        "0006": HDMI2
        "0007": HDMI3
        "0008": HDMI4

- id: set_tv_speaker_mode
  label: Set TV Speaker Mode
  kind: action
  command: "SPKM{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": SPEAKER
        "0001": OFF
        "0002": ARC_FIRST

- id: set_b2b_mode
  label: Set B2B Function Mode
  kind: action
  command: "B2BM{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": ENABLE
        "0001": DISABLE

- id: set_usb_behavior
  label: Set USB Behavior
  kind: action
  command: "USBM{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": Home
        "0001": B2B

- id: set_pixel_shifting
  label: Set Pixel Shifting
  kind: action
  command: "PSHF{value}"
  params:
    - name: value
      type: enum
      values:
        "0000": off
        "0001": on
```

## Feedbacks

```yaml
- id: power_on_command_setting
  label: RS-232 Remote Power On Setting
  query_command: "PWRE????"
  type: enum
  values:
    "0": disabled
    "1": enabled

- id: current_input
  label: Current Input Source
  query_command: "INPT????"
  type: enum
  values:
    "1": TV
    "3": Component
    "4": AV
    "6": VGA
    "9": HDMI1
    "10": HDMI2
    "11": HDMI3
    "12": HDMI4

- id: picture_mode
  label: Current Picture Mode
  query_command: "PMOD????"
  type: enum
  values:
    "0": Standard
    "2": Vivid
    "3": EnergySaving
    "4": Theater
    "5": Game
    "6": Sport

- id: brightness
  label: Brightness Value
  query_command: "BRIT????"
  type: integer
  range: [0, 100]

- id: contrast
  label: Contrast Value
  query_command: "CONT????"
  type: integer
  range: [0, 100]

- id: color_saturation
  label: Color Saturation Value
  query_command: "COLR????"
  type: integer
  range: [0, 100]

- id: tint
  label: Tint Value
  query_command: "TINT????"
  type: integer
  range: [0, 100]

- id: sharpness
  label: Sharpness Value
  query_command: "SHRP????"
  type: integer
  range: [0, 20]

- id: aspect_ratio
  label: Current Aspect Ratio
  query_command: "ASPT????"
  type: enum
  values:
    "0": Auto
    "2": Normal
    "3": Zoom
    "4": Wide
    "5": Direct
    "6": 1-to-1pixel
    "7": Panoramic
    "8": Cinema

- id: overscan
  label: Overscan State
  query_command: "OVSN????"
  type: enum
  values:
    "0": on
    "2": off

- id: color_temp
  label: Current Color Temperature
  query_command: "CTEM????"
  type: enum
  values:
    "0": High
    "2": Middle
    "3": Mid-Low
    "4": Low

- id: backlight
  label: Backlight Value
  query_command: "BKLV????"
  type: integer
  range: [0, 100]

- id: sound_mode
  label: Current Sound Mode
  query_command: "AMOD????"
  type: enum
  values:
    "0": Standard
    "2": Theater
    "3": Music
    "4": Speech
    "5": Late_night

- id: volume
  label: Current Volume
  query_command: "VOLM????"
  type: integer
  range: [0, 100]

- id: mute_state
  label: Mute State
  query_command: "MUTE????"
  type: enum
  values:
    "0": unmuted
    "1": muted

- id: tv_speaker
  label: TV Speaker State
  query_command: "ASPK????"
  type: enum
  values:
    "0": off
    "2": on

- id: tuner_mode
  label: Tuner Mode
  query_command: "TUNR????"
  type: enum
  values:
    "0": Antenna
    "2": Cable

- id: caption_state
  label: Closed Caption State
  query_command: "CC##????"
  type: enum
  values:
    "0": off
    "2": on
    "3": on_when_mute

- id: osd_language
  label: OSD Language
  query_command: "LANG????"
  type: enum
  values:
    "0": English
    "2": Español
    "3": Français

- id: standby_led
  label: Standby LED State
  query_command: "PLED????"
  type: enum
  values:
    "0": off
    "2": on

- id: power_off_control_mode
  label: Power Off Control Mode
  query_command: "PBTN????"
  type: enum
  values:
    "0": AC_ONLY
    "1": ALL

- id: volume_range
  label: Volume Range (max)
  query_command: "MAVL????"
  type: integer
  range: [0, 100]

- id: volume_control_mode
  label: Volume Control Mode
  query_command: "SVOL????"
  type: enum
  values:
    "0": LOCKED
    "1": LAST_VOLUME
    "2": AC_RESET
    "3": STANDBY_RESET

- id: volume_locked_level
  label: Volume Locked Level
  query_command: "VLFL????"
  type: integer
  range: [0, 100]

- id: remote_key_mode
  label: Remote Key Mode
  query_command: "RMOT????"
  type: enum
  values:
    "0": ENABLE
    "1": DISABLE
    "2": PARTIAL

- id: panel_key_mode
  label: Panel Key Mode
  query_command: "PANL????"
  type: enum
  values:
    "0": ENABLE
    "1": DISABLE

- id: menu_access
  label: Menu Access State
  query_command: "MENU????"
  type: enum
  values:
    "0": ENABLE
    "1": DISABLE

- id: av_setting_menu
  label: AV Setting Menu State
  query_command: "AVMN????"
  type: enum
  values:
    "0": DISABLE
    "1": ENABLE

- id: osd_mode
  label: OSD Mode
  query_command: "OSD#????"
  type: enum
  values:
    "0": ENABLE
    "1": DISABLE

- id: input_mode
  label: Input Mode
  query_command: "INPM????"
  type: enum
  values:
    "0": LOCKED
    "1": SELECTABLE
    "2": AC_RESET
    "3": STANDBY_RESET
```

## Variables

```yaml
# UNRESOLVED: Power-On Input Selection (POIS) command was partially visible in source (truncated).
# Full parameter table not recoverable from source excerpt.
```

## Events

```yaml
# UNRESOLVED: No unsolicited notification mechanism described in source.
# TV responds only to explicit commands; no push events documented.
```

## Macros

```yaml
# UNRESOLVED: No multi-step macro sequences described in source.
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: >
      RS-232 control must be explicitly enabled via the TV's Custom Install menu
      before any serial commands will be accepted. Access code: press Quick Settings,
      then enter 7310 on remote. Set "Custom Installation" to Enable.
  - description: >
      RS-232 power-on from standby requires an additional prerequisite: set
      "Power On Command" to Enable in the Custom Install menu, then send
      PWRE0001 via RS-232 to arm remote power-on. A WAIT response may precede
      the final OKAY on power-on commands.
```

## Notes

**BTTN button code reference (partial):**

| Function | Code | Function | Code |
|---|---|---|---|
| POWER | 1012 | MUTE | 1031 |
| VOL- | 1032 | VOL+ | 1033 |
| CH+ | 1034 | CH- | 1035 |
| INPUT | 1036 | MENU | 1038 |
| Connected Home | 1039 | OK/ENTER | 1040 |
| UP | 1041 | DOWN | 1042 |
| LEFT | 1043 | RIGHT | 1044 |
| BACK | 1045 | EXIT | 1046 |
| Digit 0–9 | 1000–1009 | — (DASH) | 1010 |
| PLAY | 1016 | FFW >> | 1017 |
| PAUSE | 1018 | PREVIOUS | 1019 |
| STOP | 1020 | NEXT >> | 1021 |
| Media Player | 1023 | SLEEP | 1024 |
| CC | 1027 | MTS/SAP | 1054 |
| Live TV | 1055 | Red | 1050 |
| Green | 1051 | Blue | 1052 |
| Yellow | 1053 | FRW << | 1015 |

**Protocol notes:**
- The protocol is **case-sensitive**. Commands must be sent in UPPERCASE.
- `#` (0x23) is the padding character for unused data positions.
- When targeting a specific TV in a multi-TV daisy-chain, use the last 3 hex digits of that TV's Ethernet MAC address as CLIENT_ID. Use `ALL` to broadcast to all TVs (no individual ACK returned for broadcasts).
- The TV may respond `WAIT` before `OKAY` for slow operations (e.g. power-on boot).
- Acknowledged responses for queries embed the data value in the 4-byte DATA field of the ACK, right-aligned, padded with `#`.

**Source document discrepancy:** The input metadata specified "Known protocol: TCP/IP" and the source file is named with `_ip`. However, the source document exclusively describes RS-232 serial control. No TCP port, IP addressing, or socket protocol is present anywhere in the source. This spec reflects the RS-232 protocol as documented. If a separate IP/TCP control document exists for this series, a separate spec revision should be created.

<!-- UNRESOLVED: Source document "Models" section was blank; specific model numbers that implement this protocol (beyond "Prosumer TV" and "65U8K Series" from entity metadata) are not stated. -->
<!-- UNRESOLVED: Power-On Input Selection (POIS) command table was truncated in the source excerpt and could not be fully reconstructed. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: RS-232 multi-drop wiring topology (daisy-chain vs. star) not described in source. -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:49.212Z
last_checked_at: 2026-05-14T18:17:16.525Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.525Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 104 spec actions match literally to source commands; all transport parameters verified verbatim in RS-232C specification section. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document title is \"RS-232/IR Protocol for Hisense® Prosumer TV\" — no TCP/IP transport is described. The input metadata stated \"Known protocol: TCP/IP\" but the source contains no TCP port, no IP addressing, and no socket-level protocol. This spec reflects serial-only control as stated in the source."
- "Specific model numbers were blank in the source \"Models\" section; entity ID supplied by caller."
- "Power-on via RS-232 requires the TV's Custom Install menu to be enabled (code 7310); this is a setup prerequisite, not a command sequence."
- "Power-On Input Selection (POIS) command was partially visible in source (truncated)."
- "No unsolicited notification mechanism described in source."
- "No multi-step macro sequences described in source."
- "Source document \"Models\" section was blank; specific model numbers that implement this protocol (beyond \"Prosumer TV\" and \"65U8K Series\" from entity metadata) are not stated."
- "Power-On Input Selection (POIS) command table was truncated in the source excerpt and could not be fully reconstructed."
- "Firmware version compatibility not stated in source."
- "RS-232 multi-drop wiring topology (daisy-chain vs. star) not described in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
