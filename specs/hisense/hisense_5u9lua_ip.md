---
spec_id: admin/hisense-5u9lua
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 5U9LUA Control Spec"
manufacturer: Hisense
model_family: 5U9LUA
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - 5U9LUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-05-04T15:18:08.216Z
last_checked_at: 2026-06-01T22:29:13.803Z
generated_at: 2026-06-01T22:29:13.803Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SPKM
  - B2BM
  - USBM
  - PSHF
  - "source refined excerpt does not enumerate which Prosumer TV models are covered; the 5U9LUA is not named in the source body. The 5U9LUA is asserted by operator context (filename + prior B2B memo)."
  - "source documents no IP/Telnet/REST control plane. The operator flagged \"TCP/IP\" as the known protocol, but the supplied refined document only covers RS-232. IP control may exist in a separate Hisense B2B document (downloadId=784) that was not in this source extract."
  - "source lists TV-Specific HEX columns (per-MAC-suffix targeting) and a Generic HEX column (broadcast client ID \"ALL\"). Only the Generic HEX form is included in the spec; per-MAC addressing is a frame-level substitution."
  - "no explicit safety warnings, interlock procedures, or power-on"
verification:
  verdict: verified
  checked_at: 2026-06-01T22:29:13.803Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec actions matched verbatim in source command tables; transport parameters confirmed; 4 source-only commands (SPKM, B2BM, USBM, PSHF) below the 5-command short threshold. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Hisense 5U9LUA Control Spec

## Summary
RS-232/IR control protocol for the Hisense Prosumer TV line, applied here to the 5U9LUA regional B2B model. The protocol is a fixed-length ASCII frame over RS-232 with a single-byte 8-bit checksum, terminated by CR (0x0D). Commands cover power, input routing, picture, audio, tuner/channel, captions, language, lock-down (volume/panel/menu/IR), and a remote-button simulator (BTTN).

<!-- UNRESOLVED: source refined excerpt does not enumerate which Prosumer TV models are covered; the 5U9LUA is not named in the source body. The 5U9LUA is asserted by operator context (filename + prior B2B memo). -->
<!-- UNRESOLVED: source documents no IP/Telnet/REST control plane. The operator flagged "TCP/IP" as the known protocol, but the supplied refined document only covers RS-232. IP control may exist in a separate Hisense B2B document (downloadId=784) that was not in this source extract. -->
<!-- UNRESOLVED: source lists TV-Specific HEX columns (per-MAC-suffix targeting) and a Generic HEX column (broadcast client ID "ALL"). Only the Generic HEX form is included in the spec; per-MAC addressing is a frame-level substitution. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600      # source: "Baud Rate 9600bps (UART)"
  data_bits: 8         # source: "Data Length 8bits"
  parity: none         # source: "Parity Bit None"
  stop_bits: 1         # source: "Stop Bit 1bit"
  flow_control: none   # source: "Flow Control None"
  connector: DB9 female chassis-mount  # source: "standard DB9 D-sub connector... female chassis mount connector"
  communication_code: ASCII  # source: "Communication Code ASCII code"
  termination: "0x0D"  # source: "TERMINATION: Carriage Return, HEX Code 0x0D"
auth:
  type: none  # inferred: no auth/login procedure documented in source
# Frame (source: "Basic Format for Control"):
#   S|CLIENT_ID(3B)|COMMAND(4B)|DATA(4B)|CHECKSUM(1B) 0x0D
#   Operation: S=Set, Q=Query
#   Client ID: "ALL" for broadcast, or last 3 bytes of Ethernet MAC for Smart TV
#   Checksum: 8-bit, sum of all bytes including checksum byte == 0 (mod 256)
# Acknowledgement frame:
#   CLIENT_ID ':' ACK DATA CHECKSUM 0x0D
#   Common ACKs: OKAY, EROR, WAIT
```

## Traits
```yaml
- powerable      # POWR, PWRE, PBTN
- routable       # INPT, INPM, POIS
- queryable      # Q???????? query commands return state
- levelable      # BRIT, CONT, COLR, TINT, SHRP, BKLV, VOLM, MAVL, VLFL
- lockable       # SVOL, RMOT, PANL, MENU, AVMN, OSD#
```

## Actions

```yaml
# Each command payload is the literal Generic HEX byte sequence for the
# broadcast ("ALL") client ID, copied verbatim from the source. Per-MAC
# addressing is a frame-level substitution of the "ALL" (0x41 0x4C 0x4C)
# bytes. Checksum bytes are included; for parameterized actions the
# implementer must recompute the 8-bit checksum after substituting DATA.

# ===== Power =====

- id: set_power_on_command_enable
  label: Set Power-On-Command Enable (RS-232 wake from standby)
  kind: action
  command: "53 41 4C 4C 50 57 52 45 30 30 30 30 D6 0D"  # SALLPWRE0000 = Disable
  params:
    - name: enable
      type: enum
      values: [0, 1]
      description: "0=Disable RS-232 Remote Power On; 1=Enable RS-232 Remote Power On"

- id: query_power_on_command_enable
  label: Query Power-On-Command Enable
  kind: query
  command: "51 41 4C 4C 50 57 52 45 3F 3F 3F 3F 9C 0D"  # QALLPWRE????

- id: set_power
  label: Set Power On/Off
  kind: action
  command: "53 41 4C 4C 50 4F 57 52 30 30 30 30 CC 0D"  # SALLPOWR0000 = Standby
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=Stand by; 1=Power on"

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  command: "53 41 4C 4C 50 42 54 4E 30 30 30 30 E0 0D"  # SALLPBTN0000 = AC ONLY
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=AC ONLY; 1=ALL"

- id: query_power_off_control_mode
  label: Query Power Off Control Mode
  kind: query
  command: "51 41 4C 4C 50 42 54 4E 3F 3F 3F 3F A6 0D"  # QALLPBTN????

# ===== Input =====

- id: set_input_source
  label: Set Input Source
  kind: action
  command: "53 41 4C 4C 49 4E 50 54 30 30 30 31 D8 0D"  # SALLINPT0001 = TV
  params:
    - name: source
      type: enum
      values: [0, 1, 3, 4, 6, 9, 10, 11, 12]
      description: "0=Cycle one at a time; 1=TV; 3=Component; 4=AV; 6=VGA; 9=HDMI1; 10=HDMI2; 11=HDMI3; 12=HDMI4"

- id: query_input_source
  label: Query Current Input Source
  kind: query
  command: "51 41 4C 4C 49 4E 50 54 3F 3F 3F 3F 9F 0D"  # QALLINPT????
  returns:
    type: enum
    values: [1, 3, 4, 6, 9, 10, 11, 12]
    description: "1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"

- id: set_input_mode
  label: Set Input Mode (lock/persistence)
  kind: action
  command: "53 41 4C 4C 49 4E 50 4D 30 30 30 30 E0 0D"  # SALLINPM0000 = LOCKED
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: "0=LOCKED; 1=SELECTABLE; 2=AC RESET; 3=STANDBY RESET"

- id: query_input_mode
  label: Query Input Mode
  kind: query
  command: "51 41 4C 4C 49 4E 50 4D 3F 3F 3F 3F A6 0D"  # QALLINPM????

- id: set_power_on_input_selection
  label: Set Power-On Input Selection
  kind: action
  command: "53 41 4C 4C 50 4F 49 53 30 30 30 30 D9 0D"  # SALLPOIS0000 = LAST
  params:
    - name: source
      type: enum
      values: [0, 1, 2, 3]
      description: "0=LAST; 1=Air; 2=AV; 3=Component (source row truncated; other values not enumerated in refined excerpt)"

# ===== Picture Mode & Picture Parameters =====

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "53 41 4C 4C 50 4D 4F 44 30 30 30 30 E4 0D"  # SALLPMOD0000 = Standard
  params:
    - name: mode
      type: enum
      values: [0, 2, 3, 4, 5, 6]
      description: "0=Standard; 2=Vivid; 3=EnergySaving; 4=Theater; 5=Game; 6=Sport"

- id: query_picture_mode
  label: Query Picture Mode
  kind: query
  command: "51 41 4C 4C 50 4D 4F 44 3F 3F 3F 3F AA 0D"  # QALLPMOD????

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "53 41 4C 4C 42 52 49 54 30 30 33 35 DB 0D"  # SALLBRIT0035 (example)
  params:
    - name: value
      type: integer
      description: "0-100 (encoded as 0000-0100 four-digit ASCII)"

- id: query_brightness
  label: Query Brightness
  kind: query
  command: "51 41 4C 4C 42 52 49 54 3F 3F 3F 3F A9 0D"  # QALLBRIT????
  returns:
    type: integer
    description: "0-100"

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "53 41 4C 4C 43 4F 4E 54 30 30 30 30 E0 0D"  # SALLCONT0000
  params:
    - name: value
      type: integer
      description: "0-100 (encoded as 0000-0100)"

- id: query_contrast
  label: Query Contrast
  kind: query
  command: "51 41 4C 4C 43 4F 4E 54 3F 3F 3F 3F A6 0D"  # QALLCONT????
  returns:
    type: integer
    description: "0-100"

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  command: "53 41 4C 4C 43 4F 4C 52 30 30 30 30 E3 0D"  # SALLCOLR0000
  params:
    - name: value
      type: integer
      description: "0-100 (encoded as 0000-0100)"

- id: query_color_saturation
  label: Query Color Saturation
  kind: query
  command: "51 41 4C 4C 43 4F 4C 52 3F 3F 3F 3F AA 0D"  # QALLCOLR????
  returns:
    type: integer
    description: "0-100"

- id: set_tint
  label: Set Tint
  kind: action
  command: "53 41 4C 4C 54 49 4E 54 30 30 30 30 E6 0D"  # SALLTINT0000 (pattern; exact bytes vary by value)
  params:
    - name: value
      type: integer
      description: "0-100 (encoded as 0000-0100)"

- id: query_tint
  label: Query Tint
  kind: query
  command: "51 41 4C 4C 54 49 4E 54 3F 3F 3F 3F 9B 0D"  # QALLTINT????
  returns:
    type: integer
    description: "0-100"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "53 41 4C 4C 53 48 52 50 30 30 30 30 D7 0D"  # SALLSHRP0000
  params:
    - name: value
      type: integer
      description: "0-20 (encoded as 0000-0020)"

- id: query_sharpness
  label: Query Sharpness
  kind: query
  command: "51 41 4C 4C 53 48 52 50 3F 3F 3F 3F 9D 0D"  # QALLSHRP????
  returns:
    type: integer
    description: "0-20"

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "53 41 4C 4C 41 53 50 54 30 30 30 30 DC 0D"  # SALLASPT0000 = Auto
  params:
    - name: ratio
      type: enum
      values: [0, 2, 3, 4, 5, 6, 7, 8]
      description: "0=Auto; 2=Normal; 3=Zoom; 4=Wide; 5=Direct; 6=1-to-1 pixel map; 7=Panoramic; 8=Cinema"

- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "51 41 4C 4C 41 53 50 54 3F 3F 3F 3F A2 0D"  # QALLASPT????

- id: set_overscan
  label: Set Overscan
  kind: action
  command: "53 41 4C 4C 4F 56 53 4E 30 30 30 30 CE 0D"  # SALLOVSN0000 = On
  params:
    - name: state
      type: enum
      values: [0, 2]
      description: "0=On; 2=Off"

- id: query_overscan
  label: Query Overscan
  kind: query
  command: "51 41 4C 4C 4F 56 53 4E 3F 3F 3F 3F 94 0D"  # QALLOVSN????

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  command: "53 41 4C 4C 52 53 54 50 31 30 30 30 CA 0D"  # SALLRSTP1000

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: "53 41 4C 4C 43 54 45 4D 30 30 30 30 EB 0D"  # SALLCTEM0000 = High
  params:
    - name: temp
      type: enum
      values: [0, 2, 3, 4]
      description: "0=High; 2=Middle; 3=Mid-Low; 4=Low"

- id: query_color_temperature
  label: Query Color Temperature
  kind: query
  command: "51 41 4C 4C 43 54 45 4D 3F 3F 3F 3F B1 0D"  # QALLCTEM????

- id: set_backlight
  label: Set Backlight Value
  kind: action
  command: "53 41 4C 4C 42 4B 4C 56 30 30 30 30 E5 0D"  # SALLBKLV0000 (pattern; varies by value)
  params:
    - name: value
      type: integer
      description: "0-100 (encoded as 0000-0100)"

- id: query_backlight
  label: Query Backlight
  kind: query
  command: "51 41 4C 4C 42 4B 4C 56 3F 3F 3F 3F AB 0D"  # QALLBKLV????
  returns:
    type: integer
    description: "0-100"

# ===== Audio =====

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: "53 41 4C 4C 41 4D 4F 44 30 30 30 30 F3 0D"  # SALLAMOD0000 = Standard
  params:
    - name: mode
      type: enum
      values: [0, 2, 3, 4, 5]
      description: "0=Standard; 2=Theater; 3=Music; 4=Speech; 5=Late night"

- id: query_sound_mode
  label: Query Sound Mode
  kind: query
  command: "51 41 4C 4C 41 4D 4F 44 3F 3F 3F 3F B9 0D"  # QALLAMOD????

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  command: "53 41 4C 4C 52 53 54 41 32 30 30 30 D8 0D"  # SALLRSTA2000

- id: set_volume
  label: Set Volume
  kind: action
  command: "53 41 4C 4C 56 4F 4C 4D 30 30 30 30 D6 0D"  # SALLVOLM0000 (value 0 example)
  params:
    - name: value
      type: integer
      description: "0-100 (encoded as 0000-0100)"

- id: query_volume
  label: Query Volume
  kind: query
  command: "51 41 4C 4C 56 4F 4C 4D 3F 3F 3F 3F 9C 0D"  # QALLVOLM????
  returns:
    type: integer
    description: "0-100"

- id: set_mute
  label: Set Mute
  kind: action
  command: "53 41 4C 4C 4D 55 54 45 30 30 30 30 D9 0D"  # SALLMUTE0000 = Off
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=Off; 1=On"

- id: query_mute
  label: Query Mute Status
  kind: query
  command: "51 41 4C 4C 4D 55 54 45 3F 3F 3F 3F 9F 0D"  # QALLMUTE????

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  command: "53 41 4C 4C 41 53 50 4B 30 30 30 30 E5 0D"  # SALLASPK0000 = Off
  params:
    - name: state
      type: enum
      values: [0, 2]
      description: "0=Off; 2=On"

- id: query_tv_speaker
  label: Query TV Speaker
  kind: query
  command: "51 41 4C 4C 41 53 50 4B 3F 3F 3F 3F AB 0D"  # QALLASPK????

# ===== Tuner / Channel =====

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  command: "53 41 4C 4C 54 55 4E 52 30 30 30 30 CB 0D"  # SALLTUNR0000 = Antenna
  params:
    - name: mode
      type: enum
      values: [0, 2]
      description: "0=Antenna; 2=Cable"

- id: query_tuner_mode
  label: Query Tuner Mode
  kind: query
  command: "51 41 4C 4C 54 55 4E 52 3F 3F 3F 3F 91 0D"  # QALLTUNR????

- id: automatic_search
  label: Automatic Channel Search
  kind: action
  command: "53 41 4C 4C 54 53 43 4E 30 30 30 31 DB 0D"  # SALLTSCN0001

- id: set_channel
  label: Channel Up/Down
  kind: action
  command: "53 41 4C 4C 43 48 41 4E 30 30 30 30 FA 0D"  # SALLCHAN0000 = down
  params:
    - name: direction
      type: enum
      values: [0, 1]
      description: "0=down; 1=up"

# ===== Captions, Language, Reset, Standby LED =====

- id: set_caption_control
  label: Set Closed Caption Mode
  kind: action
  command: "53 41 4C 4C 43 43 23 23 30 30 30 30 48 0D"  # SALLCC##0000 = off
  params:
    - name: mode
      type: enum
      values: [0, 2, 3]
      description: "0=off; 2=on; 3=on when mute"

- id: query_caption_control
  label: Query Caption Control
  kind: query
  command: "51 41 4C 4C 43 43 23 23 3F 3F 3F 3F 0E 0D"  # QALLCC##????

- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  command: "53 41 4C 4C 52 53 45 54 39 39 39 39 B2 0D"  # SALLRSET9999

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: "53 41 4C 4C 4C 41 4E 47 30 30 30 30 F2 0D"  # SALLLANG0000 = English
  params:
    - name: language
      type: enum
      values: [0, 2, 3]
      description: "0=English; 2=Español; 3=Français"

- id: query_osd_language
  label: Query OSD Language
  kind: query
  command: "51 41 4C 4C 4C 41 4E 47 3F 3F 3F 3F B8 0D"  # QALLLANG????

- id: set_standby_led
  label: Set Standby LED
  kind: action
  command: "53 41 4C 4C 50 4C 45 44 30 30 30 30 EF 0D"  # SALLPLED0000 = Off
  params:
    - name: state
      type: enum
      values: [0, 2]
      description: "0=Off; 2=On"

- id: query_standby_led
  label: Query Standby LED
  kind: query
  command: "51 41 4C 4C 50 4C 45 44 3F 3F 3F 3F B5 0D"  # QALLPLED????

# ===== Lock / Lock-down Controls =====

- id: set_volume_control_mode
  label: Set Volume Control Mode (lock/persistence)
  kind: action
  command: "53 41 4C 4C 53 56 4F 4C 30 30 30 30 D0 0D"  # SALLSVOL0000 = LOCKED
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: "0=LOCKED; 1=LAST VOLUME; 2=AC RESET; 3=STANDBY RESET"

- id: query_volume_control_mode
  label: Query Volume Control Mode
  kind: query
  command: "51 41 4C 4C 53 56 4F 4C 3F 3F 3F 3F 96 0D"  # QALLSVOL????

- id: set_max_volume
  label: Set Max Volume Range
  kind: action
  command: "53 41 4C 4C 4D 41 56 4C 30 30 30 30 E6 0D"  # SALLMAVL0000 (pattern)
  params:
    - name: value
      type: integer
      description: "0-100 (encoded as 0000-0100)"

- id: query_max_volume
  label: Query Max Volume Range
  kind: query
  command: "51 41 4C 4C 4D 41 56 4C 3F 3F 3F 3F AA 0D"  # QALLMAVL????
  returns:
    type: integer
    description: "0-100"

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  command: "53 41 4C 4C 56 4C 46 4C 30 30 30 30 E2 0D"  # SALLVLFL0000 (pattern)
  params:
    - name: value
      type: integer
      description: "0-100 (encoded as 0000-0100)"

- id: query_volume_locked_level
  label: Query Volume Locked Level
  kind: query
  command: "51 41 4C 4C 56 4C 46 4C 3F 3F 3F 3F A6 0D"  # QALLVLFL????
  returns:
    type: integer
    description: "0-100"

- id: set_remote_key
  label: Set Remote Key Lock
  kind: action
  command: "53 41 4C 4C 52 4D 4F 54 30 30 30 30 D2 0D"  # SALLRMOT0000 = ENABLE
  params:
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0=ENABLE; 1=DISABLE; 2=PARTIAL"

- id: query_remote_key
  label: Query Remote Key Lock
  kind: query
  command: "51 41 4C 4C 52 4D 4F 54 3F 3F 3F 3F 98 0D"  # QALLRMOT????

- id: set_panel_key
  label: Set Panel Button Lock
  kind: action
  command: "53 41 4C 4C 50 41 4E 4C 30 30 30 30 E9 0D"  # SALLPANL0000 = ENABLE
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=ENABLE; 1=DISABLE"

- id: query_panel_key
  label: Query Panel Button Lock
  kind: query
  command: "51 41 4C 4C 50 41 4E 4C 3F 3F 3F 3F AF 0D"  # QALLPANL????

- id: set_menu_access
  label: Set Menu Access Lock
  kind: action
  command: "53 41 4C 4C 4D 45 4E 55 30 30 30 30 DF 0D"  # SALLMENU0000 = ENABLE
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=ENABLE; 1=DISABLE"

- id: query_menu_access
  label: Query Menu Access Lock
  kind: query
  command: "51 41 4C 4C 4D 45 4E 55 3F 3F 3F 3F A5 0D"  # QALLMENU????

- id: set_av_setting_menu
  label: Set AV Setting Menu Lock
  kind: action
  command: "53 41 4C 4C 41 56 4D 4E 30 30 30 30 E2 0D"  # SALLAVMN0000 = DISABLE
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=DISABLE; 1=ENABLE"

- id: query_av_setting_menu
  label: Query AV Setting Menu Lock
  kind: query
  command: "51 41 4C 4C 41 56 4D 4E 3F 3F 3F 3F A8 0D"  # QALLAVMN????

- id: set_osd_mode
  label: Set OSD Mode (visibility lock)
  kind: action
  command: "53 41 4C 4C 4F 53 44 23 30 30 30 30 0B 0D"  # SALLOSD#0000 = ENABLE
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=ENABLE; 1=DISABLE"

- id: query_osd_mode
  label: Query OSD Mode
  kind: query
  command: "51 41 4C 4C 4F 53 44 23 3F 3F 3F 3F D1 0D"  # QALLOSD#????

# ===== Remote Control Button Simulator (BTTN) =====
# BTTN is a single command with 4-digit DATA field. Each row in the source is
# a different button code; they collapse to one parameterized action.

- id: send_remote_button
  label: Simulate Remote Button Press
  kind: action
  command: "53 41 4C 4C 42 54 54 4E 31 30 31 32 D8 0D"  # SALLBTTN1012 = POWER (example)
  params:
    - name: button_code
      type: enum
      description: "4-digit ASCII button code from source table"
      values:
        - "1000"   # 0
        - "1001"   # 1
        - "1002"   # 2
        - "1003"   # 3
        - "1004"   # 4
        - "1005"   # 5
        - "1006"   # 6
        - "1007"   # 7
        - "1008"   # 8
        - "1009"   # 9
        - "1010"   # - (DASH)
        - "1012"   # POWER
        - "1015"   # FRW <<
        - "1016"   # PLAY
        - "1017"   # FFW >>
        - "1018"   # PAUSE
        - "1019"   # PREVIOUS <<
        - "1020"   # STOP
        - "1021"   # NEXT >>
        - "1023"   # Media Player (HiMedia)
        - "1024"   # SLEEP
        - "1027"   # CC
        - "1031"   # MUTE
        - "1032"   # VOL-
        - "1033"   # VOL+
        - "1034"   # CH+
        - "1035"   # CH-
        - "1036"   # INPUT
        - "1038"   # MENU
        - "1039"   # HiSmart (Connected Home)
        - "1040"   # OK/ENTER
        - "1041"   # UP
        - "1042"   # DOWN
        - "1043"   # LEFT
        - "1044"   # RIGHT
        - "1045"   # BACK
        - "1046"   # EXIT
        - "1050"   # Red
        - "1051"   # Green
        - "1052"   # Blue
        - "1053"   # Yellow
        - "1054"   # MTS/SAP
        - "1055"   # Live TV
```

## Feedbacks
```yaml
# ACKs returned in the 4-byte ACK field of the acknowledgement frame
- id: ack_okay
  type: enum
  values: [OKAY]
  description: "Command accepted. Source: 'The most common ACK are OKAY,EROR,WAIT'"

- id: ack_error
  type: enum
  values: [EROR]
  description: "Command rejected or parse error."

- id: ack_wait
  type: enum
  values: [WAIT]
  description: "Command accepted, processing; client should re-query."

# Query responses return DATA in the acknowledgement frame.
# Mappings are documented per-action above (see `returns:`).
```

## Variables
```yaml
# Continuous, settable values exposed as 0-100 (or 0-20 for sharpness) levels.
- id: volume_level
  type: integer
  range: [0, 100]
  set_action: set_volume
  query_action: query_volume
- id: brightness_level
  type: integer
  range: [0, 100]
  set_action: set_brightness
  query_action: query_brightness
- id: contrast_level
  type: integer
  range: [0, 100]
  set_action: set_contrast
  query_action: query_contrast
- id: color_saturation_level
  type: integer
  range: [0, 100]
  set_action: set_color_saturation
  query_action: query_color_saturation
- id: tint_level
  type: integer
  range: [0, 100]
  set_action: set_tint
  query_action: query_tint
- id: sharpness_level
  type: integer
  range: [0, 20]
  set_action: set_sharpness
  query_action: query_sharpness
- id: backlight_level
  type: integer
  range: [0, 100]
  set_action: set_backlight
  query_action: query_backlight
- id: max_volume
  type: integer
  range: [0, 100]
  set_action: set_max_volume
  query_action: query_max_volume
- id: volume_locked_level
  type: integer
  range: [0, 100]
  set_action: set_volume_locked_level
  query_action: query_volume_locked_level
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_settings   # RSET9999 wipes user configuration
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements documented in source beyond the custom-install
# enable steps for the RS-232 port itself (see Notes).
```

## Notes
Source is the "RS-232/IR Protocol for Hisense® Prosumer TV" document (RS-232/IR guide). The refined excerpt's "## Models" section is empty in this extract and the 5U9LUA model number does not appear in the body. The 5U9LUA is asserted as covered by operator context (filename + prior B2B memo for HiSense Prosumer TV line); the actual model-to-protocol binding should be re-verified against a model list in the full document.

The protocol is case-sensitive ASCII. The frame is exactly 14 bytes on the wire (OPERATION + CLIENT_ID + COMMAND + DATA + CHECKSUM = 1+3+4+4+1) followed by CR (0x0D). Checksum is 8-bit; the sum of all 13 bytes BEFORE the CR (i.e., the entire frame including the CHECKSUM byte) must equal 0 mod 256. Implementers must recompute the checksum whenever DATA is parameterized.

Per the source, two CLIENT_ID forms are supported: "ALL" (broadcast) and a 3-character suffix drawn from the TV's Ethernet MAC address (e.g. "5FA" for a MAC ending in `...:5F:A`). The protocol uses the Ethernet MAC only as a client identifier; the source describes no IP-based control plane. The Hisense B2B portal hosts a separate IP Control Guide (downloadId=784 per prior operator memo) that is NOT in this source extract. Treat IP control as UNRESOLVED until that document is refined and merged.

The RS-232 port on the TV is a female DB9 D-sub chassis-mount connector. The source instructs installers to enable the port via the TV's Custom Install menu (Settings → Quick Settings → enter 7-3-1-0 → scroll to Custom Installation → Enable). For wake-from-standby over RS-232, the "Power On Command" setting must also be Enable in the same menu (this is what the PWRE command toggles).

IR control uses discrete NEC-format codes (e.g. POWER ON = 04 FB 71 8E) and is documented in the same source but is not covered in this serial spec. Discrete IR codes reference the data byte / complement pair (e.g. HDMI.1 = 04 FB 7C 83) and are emitted as Pronto CCF strings. The full IR table has ~70 functions; an IR-only sibling spec could be generated from the same source if needed.

The BTTN command set is a remote-control simulator: every key on the user's remote has a numeric code. The codes listed in the actions are exhaustive of the source's BTTN table.

POIS (Power-On Input Selection) table in the source is partially truncated in the refined excerpt — only values 0 (LAST), 1 (Air), 2 (AV), 3 (Component) are visible. Other values likely include HDMIx and VGA but are not in the source extract.

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-05-04T15:18:08.216Z
last_checked_at: 2026-06-01T22:29:13.803Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T22:29:13.803Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec actions matched verbatim in source command tables; transport parameters confirmed; 4 source-only commands (SPKM, B2BM, USBM, PSHF) below the 5-command short threshold. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SPKM
- B2BM
- USBM
- PSHF
- "source refined excerpt does not enumerate which Prosumer TV models are covered; the 5U9LUA is not named in the source body. The 5U9LUA is asserted by operator context (filename + prior B2B memo)."
- "source documents no IP/Telnet/REST control plane. The operator flagged \"TCP/IP\" as the known protocol, but the supplied refined document only covers RS-232. IP control may exist in a separate Hisense B2B document (downloadId=784) that was not in this source extract."
- "source lists TV-Specific HEX columns (per-MAC-suffix targeting) and a Generic HEX column (broadcast client ID \"ALL\"). Only the Generic HEX form is included in the spec; per-MAC addressing is a frame-level substitution."
- "no explicit safety warnings, interlock procedures, or power-on"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
