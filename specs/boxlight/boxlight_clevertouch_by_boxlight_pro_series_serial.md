---
spec_id: admin/boxlight-clevertouch-pro-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Boxlight Clevertouch Pro Series Control Spec"
manufacturer: Boxlight
model_family: "Clevertouch By Boxlight Pro Series"
aliases: []
compatible_with:
  manufacturers:
    - Boxlight
  models:
    - "Clevertouch By Boxlight Pro Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - old.support.clevertouch.com
  - manualslib.com
source_urls:
  - "https://old.support.clevertouch.com/Support/RS232%20code%20for%20Clevertouch%20Plus.pdf"
  - https://www.manualslib.com/manual/3179079/Boxlight-Clevertouch-Ctl-86ds94kv2.html
retrieved_at: 2026-06-30T11:41:19.373Z
last_checked_at: 2026-07-07T11:04:06.132Z
generated_at: 2026-07-07T11:04:06.132Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. The source title is \"Clevertouch Plus\"; the product is marketed under the Clevertouch By Boxlight Pro Series line."
  - "flow control not stated in source"
  - "source documents no unsolicited/notification events."
  - "source documents no multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "flow control mode not stated in source."
  - "firmware version compatibility not stated in source."
  - "query_volume search code trailing bytes reconstructed from documented framing (source status-checking table cell is split); confirmed by checksum formula and consistent reply main 0x82."
  - "exact product model string — source title \"Clevertouch Plus\" vs entity/device name \"Clevertouch By Boxlight Pro Series\"."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:04:06.132Z
  matched_actions: 77
  action_count: 77
  confidence: medium
  summary: "All 77 spec actions verified against source command table; parameterized set_volume and set_tv_channel correctly annotated; all 50 remote control keys present; transport parameters (baud, bits, parity, stop) match source exactly. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Boxlight Clevertouch Pro Series Control Spec

## Summary
Boxlight Clevertouch Pro Series ("Clevertouch Plus") large-format LED LCD touch
display controlled over an RS-232C serial interface (DSUB 9-pin male). This spec
covers the binary frame protocol documented in the Clevertouch Plus RS232 control
codes reference: power control, source/channel selection, volume and mute, aspect
ratio, TV channel tuning, attached-PC power, an emulated remote-control key set
(50 keys), and status-query commands for power, volume, audio-mute, input and PC
state.

<!-- UNRESOLVED: firmware version compatibility not stated in source. The source title is "Clevertouch Plus"; the product is marketed under the Clevertouch By Boxlight Pro Series line. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600        # source: "Baud Rate Select: 9600bps (fixed)"
  data_bits: 8           # source: "Data bits: 8bits (fixed)"
  parity: none           # source: "Parity: None (fixed)"
  stop_bits: 1           # source: "Stop Bits: 1(fixed)"
  flow_control: null     # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

Connector: DSUB 9-pin male (rear, near Tuner). Pin 2 = TXD (output to TV), Pin 3 = RXD (input from TV), Pin 5 = GND, Pin frame = GND; pins 1,4,6,7,8,9 = NC. Pin-to-pin (straight) connection per source.

Frame format (10 bytes), verbatim from source command-format table:

| Byte # | Value | Description |
|--------|-------|-------------|
| 1 | 0xAA | Head (fixed) |
| 2 | 0xBB | fixed |
| 3 | 0xCC | fixed |
| 4 | — | Main Command |
| 5 | — | Subcommand |
| 6 | 0x00 | Length / valid data |
| 7 | — | Checksum = (byte4 + byte5 + byte6) & 0xFF, "Sum from No.4 to No.6" |
| 8 | 0xDD | End (fixed) |
| 9 | 0xEE | fixed |
| 10 | 0xFF | fixed |

## Traits
```yaml
traits:
  - powerable   # inferred from Power ON/OFF (main 01) and Power of PC ON/OFF (main 09)
  - routable    # inferred from source/channel selection commands (main 02)
  - levelable   # inferred from Volume 000-100 set (main 03) and TV channel tune (main 05)
  - queryable   # inferred from status-checking commands (power/volume/audio/input/PC)
```

## Actions
```yaml
# All payloads are hex byte strings verbatim from the source code list.
# Checksum byte is included verbatim where the source lists a fixed command.
# For parameterized commands (volume, TV channel) the checksum must be computed
# as (main + sub + value) & 0xFF - see params notes.

# --- Power (main 01) ---
- id: power_on
  label: Power On
  kind: action
  command: "AA BB CC 01 00 00 01 DD EE FF"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "AA BB CC 01 01 00 02 DD EE FF"
  params: []

# --- Source / Channel select (main 02) ---
- id: select_tv
  label: Select Source TV
  kind: action
  command: "AA BB CC 02 01 00 03 DD EE FF"
  params: []

- id: select_cvbs
  label: Select Source CVBS
  kind: action
  command: "AA BB CC 02 02 00 04 DD EE FF"
  params: []

- id: select_vga3
  label: Select Source VGA3
  kind: action
  command: "AA BB CC 02 0B 00 0D DD EE FF"
  params: []

- id: select_vga1
  label: Select Source VGA1
  kind: action
  command: "AA BB CC 02 03 00 05 DD EE FF"
  params: []

- id: select_vga2
  label: Select Source VGA2
  kind: action
  command: "AA BB CC 02 04 00 06 DD EE FF"
  params: []

- id: select_hdmi1
  label: Select Source HDMI1
  kind: action
  command: "AA BB CC 02 06 00 08 DD EE FF"
  params: []

- id: select_hdmi2
  label: Select Source HDMI2
  kind: action
  command: "AA BB CC 02 07 00 09 DD EE FF"
  params: []

- id: select_hdmi3
  label: Select Source HDMI3
  kind: action
  command: "AA BB CC 02 05 00 07 DD EE FF"
  params: []

- id: select_pc
  label: Select Source PC
  kind: action
  command: "AA BB CC 02 08 00 0A DD EE FF"
  params: []

- id: select_hdmi4k
  label: Select Source HDMI4K (4K*2K)
  kind: action
  command: "AA BB CC 02 0D 00 0F DD EE FF"
  params: []

- id: select_android
  label: Select Source Android
  kind: action
  command: "AA BB CC 02 0A 00 0C DD EE FF"
  params: []

# --- Volume (main 03) ---
- id: set_volume
  label: Set Volume
  kind: action
  command: "AA BB CC 03 00 {level} {checksum} DD EE FF"
  params:
    - name: level
      type: integer
      description: "Volume level 0-100 decimal, sent as two-hex-digit byte (e.g. 30 decimal -> 1E). Source row: '000-100'."
    - name: checksum
      type: string
      description: "Computed: (0x03 + 0x00 + level) & 0xFF, two hex digits. Source example: level 1E -> checksum 21."

- id: mute
  label: Mute
  kind: action
  command: "AA BB CC 03 01 00 04 DD EE FF"
  params: []

- id: unmute
  label: Unmute
  kind: action
  command: "AA BB CC 03 01 01 05 DD EE FF"
  params: []

# --- Aspect ratio (main 08) ---
- id: aspect_16_9
  label: Aspect 16:9
  kind: action
  command: "AA BB CC 08 00 00 08 DD EE FF"
  params: []

- id: aspect_4_3
  label: Aspect 4:3
  kind: action
  command: "AA BB CC 08 01 00 09 DD EE FF"
  params: []

- id: aspect_point_to_point
  label: Aspect Point to Point
  kind: action
  command: "AA BB CC 08 07 00 0F DD EE FF"
  params: []

# --- TV channel tune (main 05) ---
- id: set_tv_channel
  label: Set ATV Channel
  kind: action
  command: "AA BB CC 05 00 {channel} {checksum} DD EE FF"
  params:
    - name: channel
      type: integer
      description: "ATV channel 00-99, sent as two-hex-digit byte. Source row: 'ATV 00-99'."
    - name: checksum
      type: string
      description: "Computed: (0x05 + 0x00 + channel) & 0xFF, two hex digits."

# --- Power of PC (main 09) ---
- id: pc_power_on
  label: Power of PC On
  kind: action
  command: "AA BB CC 09 01 00 0A DD EE FF"
  params: []

- id: pc_power_off
  label: Power of PC Off
  kind: action
  command: "AA BB CC 09 00 00 09 DD EE FF"
  params: []

# --- Remote-control emulation (main 07) - 50 keys, each a distinct source row ---
- id: rc_win
  label: Remote WIN
  kind: action
  command: "AA BB CC 07 0B 00 12 DD EE FF"
  params: []

- id: rc_space
  label: Remote Space
  kind: action
  command: "AA BB CC 07 46 00 4D DD EE FF"
  params: []

- id: rc_alt_tab
  label: Remote Alt+Tab
  kind: action
  command: "AA BB CC 07 1D 00 24 DD EE FF"
  params: []

- id: rc_alt_f4
  label: Remote Alt+F4
  kind: action
  command: "AA BB CC 07 1F 00 26 DD EE FF"
  params: []

- id: rc_num_1
  label: Remote NUM_1
  kind: action
  command: "AA BB CC 07 00 00 07 DD EE FF"
  params: []

- id: rc_num_2
  label: Remote NUM_2
  kind: action
  command: "AA BB CC 07 10 00 17 DD EE FF"
  params: []

- id: rc_num_3
  label: Remote NUM_3
  kind: action
  command: "AA BB CC 07 11 00 18 DD EE FF"
  params: []

- id: rc_num_4
  label: Remote NUM_4
  kind: action
  command: "AA BB CC 07 13 00 1A DD EE FF"
  params: []

- id: rc_num_5
  label: Remote NUM_5
  kind: action
  command: "AA BB CC 07 14 00 1B DD EE FF"
  params: []

- id: rc_num_6
  label: Remote NUM_6
  kind: action
  command: "AA BB CC 07 15 00 1C DD EE FF"
  params: []

- id: rc_num_7
  label: Remote NUM_7
  kind: action
  command: "AA BB CC 07 17 00 1E DD EE FF"
  params: []

- id: rc_num_8
  label: Remote NUM_8
  kind: action
  command: "AA BB CC 07 18 00 1F DD EE FF"
  params: []

- id: rc_num_9
  label: Remote NUM_9
  kind: action
  command: "AA BB CC 07 19 00 20 DD EE FF"
  params: []

- id: rc_num_0
  label: Remote NUM_0
  kind: action
  command: "AA BB CC 07 1B 00 22 DD EE FF"
  params: []

- id: rc_display
  label: Remote Display
  kind: action
  command: "AA BB CC 07 1C 00 23 DD EE FF"
  params: []

- id: rc_refresh
  label: Remote Refresh
  kind: action
  command: "AA BB CC 07 4C 00 53 DD EE FF"
  params: []

- id: rc_input
  label: Remote Input
  kind: action
  command: "AA BB CC 07 07 00 0E DD EE FF"
  params: []

- id: rc_home
  label: Remote Home
  kind: action
  command: "AA BB CC 07 48 00 4F DD EE FF"
  params: []

- id: rc_menu
  label: Remote Menu
  kind: action
  command: "AA BB CC 07 0D 00 14 DD EE FF"
  params: []

- id: rc_delete
  label: Remote Delete
  kind: action
  command: "AA BB CC 07 40 00 47 DD EE FF"
  params: []

- id: rc_energy
  label: Remote Energy
  kind: action
  command: "AA BB CC 07 4E 00 55 DD EE FF"
  params: []

- id: rc_up
  label: Remote UP
  kind: action
  command: "AA BB CC 07 47 00 4E DD EE FF"
  params: []

- id: rc_down
  label: Remote DOWN
  kind: action
  command: "AA BB CC 07 4D 00 54 DD EE FF"
  params: []

- id: rc_left
  label: Remote LEFT
  kind: action
  command: "AA BB CC 07 49 00 50 DD EE FF"
  params: []

- id: rc_right
  label: Remote RIGHT
  kind: action
  command: "AA BB CC 07 4B 00 52 DD EE FF"
  params: []

- id: rc_enter
  label: Remote ENTER
  kind: action
  command: "AA BB CC 07 4A 00 51 DD EE FF"
  params: []

- id: rc_point
  label: Remote Point
  kind: action
  command: "AA BB CC 07 06 00 0D DD EE FF"
  params: []

- id: rc_back
  label: Remote Back
  kind: action
  command: "AA BB CC 07 0A 00 11 DD EE FF"
  params: []

- id: rc_ch_up
  label: Remote CH+
  kind: action
  command: "AA BB CC 07 02 00 09 DD EE FF"
  params: []

- id: rc_ch_down
  label: Remote CH-
  kind: action
  command: "AA BB CC 07 09 00 10 DD EE FF"
  params: []

- id: rc_vol_up
  label: Remote VOL+
  kind: action
  command: "AA BB CC 07 03 00 0A DD EE FF"
  params: []

- id: rc_vol_down
  label: Remote VOL-
  kind: action
  command: "AA BB CC 07 41 00 48 DD EE FF"
  params: []

- id: rc_page_up
  label: Remote PageUp
  kind: action
  command: "AA BB CC 07 42 00 49 DD EE FF"
  params: []

- id: rc_page_down
  label: Remote PageDown
  kind: action
  command: "AA BB CC 07 0F 00 16 DD EE FF"
  params: []

- id: rc_f1
  label: Remote F1
  kind: action
  command: "AA BB CC 07 45 00 4C DD EE FF"
  params: []

- id: rc_f2
  label: Remote F2
  kind: action
  command: "AA BB CC 07 12 00 19 DD EE FF"
  params: []

- id: rc_f3
  label: Remote F3
  kind: action
  command: "AA BB CC 07 51 00 58 DD EE FF"
  params: []

- id: rc_f4
  label: Remote F4
  kind: action
  command: "AA BB CC 07 5B 00 62 DD EE FF"
  params: []

- id: rc_f5
  label: Remote F5
  kind: action
  command: "AA BB CC 07 44 00 4B DD EE FF"
  params: []

- id: rc_f6
  label: Remote F6
  kind: action
  command: "AA BB CC 07 50 00 57 DD EE FF"
  params: []

- id: rc_f7
  label: Remote F7
  kind: action
  command: "AA BB CC 07 43 00 4A DD EE FF"
  params: []

- id: rc_f8
  label: Remote F8
  kind: action
  command: "AA BB CC 07 1A 00 21 DD EE FF"
  params: []

- id: rc_f9
  label: Remote F9
  kind: action
  command: "AA BB CC 07 04 00 0B DD EE FF"
  params: []

- id: rc_f10
  label: Remote F10
  kind: action
  command: "AA BB CC 07 59 00 60 DD EE FF"
  params: []

- id: rc_f11
  label: Remote F11
  kind: action
  command: "AA BB CC 07 57 00 5E DD EE FF"
  params: []

- id: rc_f12
  label: Remote F12
  kind: action
  command: "AA BB CC 07 08 00 0F DD EE FF"
  params: []

- id: rc_red
  label: Remote RED
  kind: action
  command: "AA BB CC 07 5C 00 63 DD EE FF"
  params: []

- id: rc_green
  label: Remote GREEN
  kind: action
  command: "AA BB CC 07 5D 00 64 DD EE FF"
  params: []

- id: rc_yellow
  label: Remote YELLOW
  kind: action
  command: "AA BB CC 07 5E 00 65 DD EE FF"
  params: []

- id: rc_blue
  label: Remote BLUE
  kind: action
  command: "AA BB CC 07 5F 00 66 DD EE FF"
  params: []

# --- Status queries (main command echoed with sub 02 / 00 / 03) ---
- id: query_power_status
  label: Check Power Status
  kind: query
  command: "AA BB CC 01 02 00 03 DD EE FF"
  params: []

- id: query_volume
  label: Check Volume
  kind: query
  command: "AA BB CC 03 02 00 05 DD EE FF"  # trailing "00 05 DD EE FF" reconstructed from documented framing; source table splits the search code cell
  params: []

- id: query_audio_status
  label: Check Audio (Mute) Status
  kind: query
  command: "AA BB CC 03 03 00 06 DD EE FF"
  params: []

- id: query_input_status
  label: Check Input Status
  kind: query
  command: "AA BB CC 02 00 00 02 DD EE FF"
  params: []

- id: query_pc_status
  label: Check PC Status
  kind: query
  command: "AA BB CC 09 02 00 0B DD EE FF"
  params: []
```

## Feedbacks
```yaml
# Query reply frames. Reply main command = 0x80 + (query main command).
# Format: AA BB CC [reply_main] [state] 00 [checksum] DD EE FF

- id: power_state
  type: enum
  values: [on, off]
  description: "Reply to query_power_status. ON: 'AA BB CC 80 00 00 80 DD EE FF'; OFF: 'AA BB CC 80 01 00 81 DD EE FF'."

- id: volume_level
  type: integer
  description: "Reply to query_volume. 'AA BB CC 82 00 xx ** DD EE FF' where xx = volume in hex (e.g. 1E = 30 decimal), ** = checksum (0x82+0x00+xx)."

- id: audio_mute_state
  type: enum
  values: [mute, unmute]
  description: "Reply to query_audio_status. MUTE: 'AA BB CC 82 01 00 83 DD EE FF'; UNMUTE: 'AA BB CC 82 01 01 84 DD EE FF'."

- id: input_state
  type: enum
  values: [tv, av, vga1, vga2, hdmi3, hdmi1, hdmi2, pc, android, hdmi4k, whdi, vga3]
  description: "Reply to query_input_status. Reply main = 0x81, second byte = source id. TV:81 01; AV:81 02; VGA1:81 03; VGA2:81 04; HDMI3:81 05; HDMI1:81 06; HDMI2:81 07; PC:81 08; ANDROID:81 0A; HDMI4K:81 0D; WHDI:81 0C; VGA3:81 0B."

- id: pc_state
  type: enum
  values: [on, off, sleep, hibernate]
  description: "Reply to query_pc_status. Reply main = 0x83. ON:83 00 00 83; OFF:83 01 00 84; SLEEP:83 02 00 85; Hibernate:83 03 00 86 (all followed by 'DD EE FF')."
```

## Variables
```yaml
# No settable parameters beyond the discrete actions and the parameterized
# set_volume / set_tv_channel actions already covered in Actions.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited/notification events.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Command framing: every command is 10 bytes, `AA BB CC [main] [sub] [data] [checksum] DD EE FF`. Checksum = low byte of (main + sub + data). For fixed commands the checksum is precomputed in the source; for parameterized commands (set_volume main 03, set_tv_channel main 05) compute it dynamically.
- Reply framing uses reply-main = 0x80 + query-main (e.g. power query main 01 -> reply main 80; input query main 02 -> reply main 81; volume/audio query main 03 -> reply main 82; PC query main 09 -> reply main 83).
- Volume is sent/received as a hex byte (00-64 = 0-100 decimal). Source example: volume 30 decimal = 1E hex, checksum = 03+00+1E = 21.
- Source labels the second source-select entry "CVBS"; the input-status reply labels the same value "AV" (0x02) — same input, two names.
- Serial settings are all marked "(fixed)" in the source; they are not configurable.

<!-- UNRESOLVED: flow control mode not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: query_volume search code trailing bytes reconstructed from documented framing (source status-checking table cell is split); confirmed by checksum formula and consistent reply main 0x82. -->
<!-- UNRESOLVED: exact product model string — source title "Clevertouch Plus" vs entity/device name "Clevertouch By Boxlight Pro Series". -->
````

## Provenance

```yaml
source_domains:
  - old.support.clevertouch.com
  - manualslib.com
source_urls:
  - "https://old.support.clevertouch.com/Support/RS232%20code%20for%20Clevertouch%20Plus.pdf"
  - https://www.manualslib.com/manual/3179079/Boxlight-Clevertouch-Ctl-86ds94kv2.html
retrieved_at: 2026-06-30T11:41:19.373Z
last_checked_at: 2026-07-07T11:04:06.132Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:04:06.132Z
matched_actions: 77
action_count: 77
confidence: medium
summary: "All 77 spec actions verified against source command table; parameterized set_volume and set_tv_channel correctly annotated; all 50 remote control keys present; transport parameters (baud, bits, parity, stop) match source exactly. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. The source title is \"Clevertouch Plus\"; the product is marketed under the Clevertouch By Boxlight Pro Series line."
- "flow control not stated in source"
- "source documents no unsolicited/notification events."
- "source documents no multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or"
- "flow control mode not stated in source."
- "firmware version compatibility not stated in source."
- "query_volume search code trailing bytes reconstructed from documented framing (source status-checking table cell is split); confirmed by checksum formula and consistent reply main 0x82."
- "exact product model string — source title \"Clevertouch Plus\" vs entity/device name \"Clevertouch By Boxlight Pro Series\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
