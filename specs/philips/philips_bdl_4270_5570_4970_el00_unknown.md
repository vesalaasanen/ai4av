---
spec_id: admin/philips-bdl-4270-5570-4970-el00
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips BDL4270EL / BDL4970EL / BDL5570EL Control Spec (SICP)"
manufacturer: Philips
model_family: BDL4270EL
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - BDL4270EL
    - BDL4970EL
    - BDL5570EL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.xibo.org.uk
  - ryoyo.co.jp
  - digis.ru
  - support.westan.com.au
  - documents.philips.com
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.ryoyo.co.jp/media/philips/bdl4270el_11/Philips_29.pdf
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.documents.philips.com/assets/20230601/754c61ee41be44d9962ab01400924da6.pdf
retrieved_at: 2026-07-24T19:16:37.693Z
last_checked_at: 2026-08-05T08:37:24.845Z
generated_at: 2026-08-05T08:37:24.845Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - 0xFE
  - "source does not state a specific firmware version; several commands list firmware-version \"TBC\" prerequisites (restart, video-present, frame compensation, off-timer, pixel-shift, ECO mode, picture style, volume mute, off-timer, monitor-restart, failover volume limits, etc.). Operability of those commands is firmware-conditional."
  - "source documents no continuous settable parameters outside of the discrete actions above"
  - "source does not document unsolicited device-pushed notifications beyond Get/Set/Report exchanges. Section omitted."
  - "source does not document multi-step macro sequences; scheduling (0x5A/0x5B) is the closest analogue and is represented as a single action with parameters."
  - "source contains no explicit safety warnings, power-on sequencing rules, or fault-recovery procedures."
  - "firmware version range that the family is tested/known to support is not stated; power-on sequencing rules are not stated; any safety/lockout/emergency behavior beyond the lock commands enumerated is not stated."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:37:24.845Z
  matched_actions: 123
  action_count: 123
  confidence: medium
  summary: "All 123 spec actions matched source opcodes verbatim; transport values present; coverage ≈123/124 unique opcodes. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Philips BDL4270EL / BDL4970EL / BDL5570EL Control Spec (SICP)

## Summary
This spec covers Philips BDL4270EL, BDL4970EL, and BDL5570EL large-format signage displays, which are identified in the source as Phoenix 2.0 platform (year 2015) and controlled via the Philips Serial Interface Communication Protocol (SICP) v2.03 over RS-232C or Ethernet (TCP port 5000). The protocol is a binary framed packet format with XOR checksums, supporting a large command catalogue for power, input routing, video/audio parameters, tiling, scheduling, sensors, and PIP/multi-window control.

<!-- UNRESOLVED: source does not state a specific firmware version; several commands list firmware-version "TBC" prerequisites (restart, video-present, frame compensation, off-timer, pixel-shift, ECO mode, picture style, volume mute, off-timer, monitor-restart, failover volume limits, etc.). Operability of those commands is firmware-conditional. -->

## Transport
```yaml
# Source explicitly states both RS-232C (DB9, 1200-57600 baud, default 9600) and Ethernet (TCP port 5000).
# No login / password / token described in source; auth is therefore none.
protocols:
  - serial
  - tcp
addressing:
  port: 5000   # source: "TCP/IP port 5000 is used by default for control in all displays"
serial:
  baud_rate: 9600   # source default; 1200, 2400, 4800, 19200, 38400, 57600 also supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

Notes on physical/cabling: source specifies a crossover (null-modem) cable is needed between host and display, RXD/TXD/GND on DB9 pin 2/3/5, and that some monitors expose RS-232 via a 2.5mm jack with a bundled jack-to-SubD9 cable.

Packet format (SICP v2.03): `MsgSize | Control (Monitor ID 0x00=broadcast / 0x01-0xFF) | Group | Data[0]..Data[N] | Checksum`, where `Checksum = XOR of all preceding bytes`; `MsgSize` byte itself counts in the total size, range 3 to 40. Host should not send a new command before receiving the previous ACK; if no response within 500 ms a retry is allowed. Valid replies are ACK (0x06), NACK (0x15), NAV (0x18). No reply is sent for wrong Monitor ID or broadcast (0x00) target.

## Traits
```yaml
powerable: true   # inferred from power on/off commands (0x18 set, 0x19 get)
routable: true    # inferred from input-source set (0xAC) and failover priority (0xA5) commands
queryable: true   # inferred from extensive Get/Report command set
levelable: true   # inferred from volume / brightness / contrast / color / tint / sharpness / backlight commands
```

## Actions
```yaml
- id: communication_control_report
  label: Communication Control - Report
  kind: action
  command: "06 01 00 00 01 06"   # example report payload (MsgSize=0x06, Control=0x01, Group=0x00, Data0=0x00, Data1=0x01, Checksum=0x06)
  notes: "Generic 0x00/0x00 reply carrying ACK=0x06 / NACK=0x15 / NAV=0x18 in Data[1]."
  params: []

- id: get_sicp_version
  label: Get SICP implementation version
  kind: query
  command: "06 01 00 A2 00 A5"   # MsgSize=0x06, Control=0x01, Group=0x00, Data0=0xA2, Data1=0x00, Checksum=0xA5
  params: []

- id: get_platform_label
  label: Get platform label (Eagle / Phoenix / Himalaya / Dragon)
  kind: query
  command: "06 01 00 A2 01 A4"   # DATA[1]=0x01 selects platform label; checksum computed as XOR of preceding bytes
  params: []

- id: get_platform_version
  label: Get platform version (e.g. Phoenix 2.0)
  kind: query
  command: "06 01 00 A2 02 A7"
  params: []

- id: get_model_number
  label: Get Model Number
  kind: query
  command: "06 01 00 A1 00 A7"   # DATA[1]=0x00
  params: []

- id: get_fw_version
  label: Get FW Version
  kind: query
  command: "06 01 00 A1 01 A6"   # DATA[1]=0x01
  params: []

- id: get_build_date
  label: Get Build Date
  kind: query
  command: "06 01 00 A1 02 A5"   # DATA[1]=0x02
  params: []

- id: get_android_fw_version
  label: Get Android FW version (build number)
  kind: query
  command: "06 01 00 A1 03 A4"   # DATA[1]=0x03; platform-dependent (Dragon 1.0+/Himalaya 2+/QL3.0+/CRD50/51 etc.)
  notes: "Platform-restricted; not applicable to Phoenix 2.0 per source table."
  params: []

- id: power_get
  label: Power State - Get
  kind: query
  command: "05 01 00 19 1D"
  notes: "Reply carries Power State: 0x01=Power Off, 0x02=On."
  params: []

- id: power_set
  label: Power State - Set
  kind: action
  command: "06 01 00 18 {state} {checksum}"   # DATA[1]=0x01 Off, 0x02 On
  params:
    - name: state
      type: integer
      description: "0x01=Power Off, 0x02=On"

- id: ir_lock_get
  label: IR-Remote Control Lock - Get
  kind: query
  command: "05 01 00 1D 19"
  notes: "Reply: 0x01=Unlock all, 0x02=Lock all, 0x03=Lock all but Power, 0x04=Lock all but Volume, 0x05=Primary, 0x06=Secondary, 0x07=Lock all except Power & Volume."
  params: []

- id: ir_lock_set
  label: IR-Remote Control Lock - Set
  kind: action
  command: "06 01 00 1C {state} {checksum}"   # DATA[1] values per ir_lock_get
  params:
    - name: state
      type: integer
      description: "0x01..0x07 lock mode (see notes)"

- id: keypad_lock_get
  label: Keypad Lock - Get
  kind: query
  command: "05 01 00 1B 1F"
  notes: "Reply: 0x01=Unlock all, 0x02=Lock all, 0x03=Lock all but Power, 0x04=Lock all but Volume, 0x07=Lock all except Power & Volume."
  params: []

- id: keypad_lock_set
  label: Keypad Lock - Set
  kind: action
  command: "06 01 00 1A {state} {checksum}"   # DATA[1] per keypad_lock_get
  params:
    - name: state
      type: integer
      description: "0x01..0x07 lock mode"

- id: power_cold_start_get
  label: Power state at Cold Start - Get
  kind: query
  command: "05 01 00 A4 A0"
  notes: "Reply: 0x00=Power Off, 0x01=Forced On, 0x02=Last Status."
  params: []

- id: power_cold_start_set
  label: Power state at Cold Start - Set
  kind: action
  command: "06 01 00 A3 {state} {checksum}"   # DATA[1] per power_cold_start_get
  params:
    - name: state
      type: integer
      description: "0x00=Power Off, 0x01=Forced On, 0x02=Last Status"

- id: input_source_set
  label: Input Source - Set
  kind: action
  command: "09 01 00 AC {src} {pl} {osd} {mute} {checksum}"   # DATA[0]=0xAC, DATA[1]=source, DATA[2]=playlist/URL, DATA[3]=OSD, DATA[4]=Mute
  notes: |
    DATA[1] source: 0x01=VIDEO, 0x02=S-VIDEO, 0x03=COMPONENT, 0x04=CVI 2(n/a), 0x05=VGA, 0x06=HDMI 2, 0x07=DP 2, 0x08=USB 2, 0x09=Card DVI-D, 0x0A=DP 1, 0x0B=Card OPS, 0x0C=USB 1, 0x0D=HDMI, 0x0E=DVI-D, 0x0F=HDMI3, 0x10=BROWSER, 0x11=SMARTCMS, 0x12=DMS, 0x13=INTERNAL STORAGE, 0x14/0x15=Reserved, 0x16=Media Player, 0x17=PDF Player, 0x18=Custom, 0x19=HDMI 4, 0x1A=VGA2, 0x1B=VGA3, 0x1C=IWB.
    DATA[2] playlist (0x01..0x07) or URL number; 0x00=ignore.
    Example: DVI-D with source-label OSD = "09 01 00 AC 09 09 01 00 A5".
  params:
    - name: src
      type: integer
      description: Input source ID (hex)
    - name: pl
      type: integer
      description: Playlist/URL slot 0x00..0x07 (0x00=ignore)
    - name: osd
      type: integer
      description: OSD style byte
    - name: mute
      type: integer
      description: Mute style byte

- id: current_source_get
  label: Current Source - Get
  kind: query
  command: "05 01 00 AD A9"
  notes: "Reply echoes current source and playlist/URL slot per input_source_set enum."
  params: []

- id: auto_signal_detect_get
  label: Auto Signal Detecting - Get
  kind: query
  command: "05 01 00 AF AB"
  notes: "Reply: 0x00=Off, 0x01=All, 0x02=Reserved, 0x03=PC sources only, 0x04=Video sources only, 0x05=Failover."
  params: []

- id: auto_signal_detect_set
  label: Auto Signal Detecting - Set
  kind: action
  command: "06 01 00 AE {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=Off, 0x01=All, 0x03=PC only, 0x04=Video only, 0x05=Failover"

- id: failover_get
  label: Failover - Get
  kind: query
  command: "05 01 00 A6 A3"
  notes: "Reply lists up to 16 priority slots (DATA[1]..DATA[16]) with source IDs per input_source_set enum."
  params: []

- id: failover_set
  label: Failover - Set
  kind: action
  command: "{ms} 01 00 A5 {p1} {p2} {p3} {p4} {p5} {p6} {p7} {p8} {p9} {p10} {p11} {p12} {p13} {p14} {p15} {p16} {checksum}"
  notes: "16 priority slots; 0x00=HIDDEN, 0x01=Component, 0x02=Composite, 0x03=DP, 0x04=DVI-D, 0x05=VGA, 0x06=OPS, 0x07=USB, 0x08=Browser, 0x09=SmartCMS, 0x0A=Internal Storage, 0x0B=DMS, 0x0C=HDMI2, 0x0D=HDMI3, 0x0E=USB Playlist, 0x0F=USB AutoPlay, 0x10=Media Player, 0x11=PDF Player, 0x12=Custom, 0x13=HDMI 4, 0x14=VGA2, 0x15=VGA3, 0x16=IWB."
  params:
    - name: p1..p16
      type: integer
      description: 16 priority slots, each 0x00..0x16

- id: monitor_restart_set
  label: Monitor Restart - Set
  kind: action
  command: "06 01 00 57 00 50"   # DATA[1]=0x00 Android (0x01=Scalar) - availability firmware-conditional
  notes: "Per source: only on Android platforms (Himalaya 2, Dragon 2) from firmware TBC."
  params:
    - name: target
      type: integer
      description: "0x00=Android, 0x01=Scalar"

- id: backlight_get
  label: Backlight status - Get
  kind: query
  command: "05 01 00 71 50"
  notes: "Reply: 0x00=backlight on, 0x01=backlight off."
  params: []

- id: backlight_set
  label: Backlight On/Off - Set
  kind: action
  command: "06 01 00 72 {state} {checksum}"   # 0x00=on, 0x01=off
  params:
    - name: state
      type: integer
      description: "0x00=on, 0x01=off"

- id: video_params_get
  label: Video Parameters - Get
  kind: query
  command: "05 01 00 33 37"
  notes: "Reply: DATA[1]=Brightness 0..100, DATA[2]=Color 0..100, DATA[3]=Contrast 0..100, DATA[4]=Sharpness 0..10 (Phoenix 2.0) or 0..100, DATA[5]=Tint -50..+50 signed (Phoenix 2.0) or 0..100, DATA[6]=Black Level 0..100, DATA[7]=Gamma (0x01=Native, 0x02=S gamma, 0x03=2.2, 0x04=2.4, 0x05=D-image DICOM)."
  params: []

- id: video_params_set
  label: Video Parameters - Set
  kind: action
  command: "0C 01 00 32 {bri} {col} {con} {sha} {tin} {blk} {gam} {checksum}"   # Phoenix 2.0 layout
  notes: "Phoenix 2.0 sharpness 0..10, tint -50..+50 (signed byte 0xCE..0xFF, 0x00..0x32). For non-Phoenix use 0..100 ranges."
  params:
    - name: bri
      type: integer
      description: Brightness 0..100
    - name: col
      type: integer
      description: Color 0..100
    - name: con
      type: integer
      description: Contrast 0..100
    - name: sha
      type: integer
      description: Sharpness 0..10 (Phoenix 2.0)
    - name: tin
      type: integer
      description: Tint -50..+50 (signed)
    - name: blk
      type: integer
      description: Black Level 0..100
    - name: gam
      type: integer
      description: "Gamma 0x01..0x05"

- id: color_temperature_get
  label: Color Temperature - Get
  kind: query
  command: "05 01 00 35 31"
  notes: "Reply: 0x00=User 1, 0x01=Native, 0x03=10000K, 0x04=9300K, 0x05=7500K, 0x06=6500K, 0x09=5000K, 0x0A=4000K, 0x0D=3000K, 0x12=User 2 (others N/A)."
  params: []

- id: color_temperature_set
  label: Color Temperature - Set
  kind: action
  command: "06 01 00 34 {ct} {checksum}"
  params:
    - name: ct
      type: integer
      description: Color temperature preset (0x00..0x12)

- id: color_params_get
  label: RGB Color Parameters - Get
  kind: query
  command: "05 01 00 37 33"
  notes: "Reply: Red gain, Green gain, Blue gain, Red offset, Green offset, Blue offset (each 0..255)."
  params: []

- id: color_params_set
  label: RGB Color Parameters - Set
  kind: action
  command: "0B 01 00 36 {rg} {gg} {bg} {ro} {go} {bo} {checksum}"
  params:
    - name: rg
      type: integer
      description: Red gain 0..255
    - name: gg
      type: integer
      description: Green gain 0..255
    - name: bg
      type: integer
      description: Blue gain 0..255
    - name: ro
      type: integer
      description: Red offset 0..255
    - name: go
      type: integer
      description: Green offset 0..255
    - name: bo
      type: integer
      description: Blue offset 0..255

- id: color_temperature_100k_get
  label: Color Temperature 100K step - Get
  kind: query
  command: "05 01 00 12 16"
  notes: "Reply: 0x14(20)=2000K .. 0x64(100)=10000K (Phoenix 2.0 effective range 0x1A=2600K..0x64=10000K)."
  params: []

- id: color_temperature_100k_set
  label: Color Temperature 100K step - Set
  kind: action
  command: "06 01 00 11 {step} {checksum}"
  params:
    - name: step
      type: integer
      description: 100K step (0x14..0x64; Phoenix 2.0 0x1A..0x64)

- id: picture_format_get
  label: Picture Format - Get
  kind: query
  command: "05 01 00 3B 3F"
  notes: "Reply bits 3..0: 0x00=Normal (4:3), 0x01=Custom, 0x02=Real (1:1), 0x03=Full, 0x04=21:9, 0x05=Dynamic, 0x06=16:9."
  params: []

- id: picture_format_set
  label: Picture Format - Set
  kind: action
  command: "06 01 00 3A {fmt} {checksum}"
  params:
    - name: fmt
      type: integer
      description: "Format 0x00..0x06"

- id: vga_params_get
  label: VGA Video Parameters - Get
  kind: query
  command: "05 01 00 39 3D"
  notes: "Reply: Clock 0..100, Clock Phase 0..100, H Position 0..100, V Position 0..100."
  params: []

- id: vga_params_set
  label: VGA Video Parameters - Set
  kind: action
  command: "09 01 00 38 {clk} {phase} {hp} {vp} {checksum}"   # Clock/Phase marked Invalid in source - H/V position only are valid
  params:
    - name: clk
      type: integer
      description: Clock 0..100 (source notes 'Invalid')
    - name: phase
      type: integer
      description: Clock Phase 0..100 (source notes 'Invalid')
    - name: hp
      type: integer
      description: H Position 0..100
    - name: vp
      type: integer
      description: V Position 0..100

- id: pip_get
  label: Picture-in-Picture - Get
  kind: query
  command: "05 01 00 3D 39"
  notes: "Source: Phoenix 2.0 does NOT support PIP."
  params: []

- id: pip_set
  label: Picture-in-Picture - Set
  kind: action
  command: "09 01 00 3C {mode} {pos} 00 00 {checksum}"
  notes: "DATA[1] low nibble: 0x00=Off, 0x01=PIP, 0x02=POP, 0x03=Quick swap, 0x04=PBP 2win, 0x05=PBP 3win, 0x06=PBP 4win, 0x07=PBP 3win-1, 0x08=PBP 3win-2, 0x09=PBP 4win-1, 0x0A=SICP Custom. DATA[2] bits 2..0 position 0..4. Phoenix 2.0 unsupported per source."
  params:
    - name: mode
      type: integer
      description: PIP mode 0x00..0x0A
    - name: pos
      type: integer
      description: Window position 0..4

- id: pip_source_get
  label: PIP Source - Get
  kind: query
  command: "05 01 00 85 81"
  notes: "Reply: DATA[1] source type (0xFD=Input Source), DATA[2..4] Q2/Q3/Q4 source per input_source_set enum."
  params: []

- id: pip_source_set
  label: PIP Source - Set
  kind: action
  command: "07 01 00 84 FD {q2} {checksum}"   # Source Type=0xFD; example DP=07 01 00 84 FD 0A 75
  notes: "Phoenix 2.0 unsupported per source."
  params:
    - name: q2
      type: integer
      description: Q2 source 0x01..0x1C

- id: volume_get
  label: Volume (Speaker + Audio Out) - Get
  kind: query
  command: "05 01 00 45 41"
  notes: "Reply: DATA[1]=Speaker Out 0..100 (0..60 on Phoenix 2.0), DATA[2]=Audio Out (omitted on Himalaya 1.x / Eagle)."
  params: []

- id: volume_set
  label: Volume (Speaker + Audio Out) - Set
  kind: action
  command: "07 01 00 44 {spk} {aud} {checksum}"   # Phoenix 2.0 Speaker/Audio 0..60
  params:
    - name: spk
      type: integer
      description: Speaker out 0..100 (0..60 on Phoenix 2.0)
    - name: aud
      type: integer
      description: Audio out 0..100 (0..60 on Phoenix 2.0)

- id: volume_step_set
  label: Volume Up/Down - Set
  kind: action
  command: "07 01 00 41 {spk} {aud} {checksum}"   # 0=down, 1=up, 2=no change (platform-restricted)
  notes: "DATA[1]/[2]: 0=down, 1=up, 2=no change (Dragon 1.0 phase3+ / Dragon 1.5 phase2+ / Dragon 1.6 / Himalaya 2.0+)."
  params:
    - name: spk
      type: integer
      description: Speaker step 0=down, 1=up, 2=no change
    - name: aud
      type: integer
      description: Audio step 0=down, 1=up, 2=no change

- id: volume_limit_speaker_set
  label: Speaker Out Volume Limits - Set
  kind: action
  command: "08 01 00 B8 {min} {max} {sw} {checksum}"   # Min ≤ SwitchOn ≤ Max
  params:
    - name: min
      type: integer
      description: Minimum volume 0..100
    - name: max
      type: integer
      description: Maximum volume 0..100
    - name: sw
      type: integer
      description: Switch-on volume 0..100

- id: volume_limit_speaker_get
  label: Speaker Out Volume Limits - Get
  kind: query
  command: "05 01 00 B6 B0"
  params: []

- id: volume_limit_audio_set
  label: Audio Out Volume Limits - Set
  kind: action
  command: "08 01 00 B9 {min} {max} {sw} {checksum}"
  notes: "Phoenix 2.0: 0..60 range for all three."
  params:
    - name: min
      type: integer
      description: Minimum 0..100 (0..60 Phoenix 2.0)
    - name: max
      type: integer
      description: Maximum 0..100 (0..60 Phoenix 2.0)
    - name: sw
      type: integer
      description: Switch-on 0..100 (0..60 Phoenix 2.0)

- id: volume_limit_audio_get
  label: Audio Out Volume Limits - Get
  kind: query
  command: "05 01 00 B7 B1"
  params: []

- id: audio_params_get
  label: Audio Parameters (Treble/Bass) - Get
  kind: query
  command: "05 01 00 43 47"
  notes: "Reply: Treble 0..100, Bass 0..100 (Phoenix 2.0: -8..+8 signed)."
  params: []

- id: audio_params_set
  label: Audio Parameters (Treble/Bass) - Set
  kind: action
  command: "07 01 00 42 {tre} {bas} {checksum}"
  notes: "Phoenix 2.0: signed -8..+8; encoded 0xF8..0xFF for negatives, 0..8 otherwise."
  params:
    - name: tre
      type: integer
      description: Treble 0..100 or -8..+8 (Phoenix 2.0)
    - name: bas
      type: integer
      description: Bass 0..100 or -8..+8 (Phoenix 2.0)

- id: volume_mute_get
  label: Volume Mute - Get
  kind: query
  command: "05 01 00 46 42"
  notes: "Reply: 0x00=mute off, 0x01=mute on. Firmware/platform availability 'TBC' per source."
  params: []

- id: volume_mute_set
  label: Volume Mute - Set
  kind: action
  command: "06 01 00 47 {state} {checksum}"   # 0x00=off, 0x01=on
  params:
    - name: state
      type: integer
      description: "0x00=off, 0x01=on"

- id: misc_info_get
  label: Misc Info - Get
  kind: query
  command: "06 01 00 0F 02 0A"   # DATA[1]=0x02 → Operating Hours
  notes: "DATA[1]=0x02 selects Operating Hours. Reply: DATA[1..2] = MSB/LSB 16-bit hours counter."
  params:
    - name: item
      type: integer
      description: "0x02=Operating Hours (others reserved)"

- id: smart_power_get
  label: Smart Power (backlight dimming) - Get
  kind: query
  command: "05 01 00 DE DA"
  notes: "Reply: 0x00=Off, 0x01=Low, 0x02=Medium, 0x03=High."
  params: []

- id: smart_power_set
  label: Smart Power - Set
  kind: action
  command: "06 01 00 DD {level} {checksum}"
  params:
    - name: level
      type: integer
      description: "0x00=Off, 0x01=Low, 0x02=Medium, 0x03=High"

- id: vga_auto_adjust_set
  label: VGA Auto Adjust - Set
  kind: action
  command: "07 01 00 70 40 00 36"   # DATA[1]=0x40, DATA[2]=0x00
  notes: "VGA input only."
  params: []

- id: temperature_get
  label: Temperature Sensor - Get
  kind: query
  command: "05 01 00 2F 2B"
  notes: "Reply: DATA[1]=Sensor 1 (0..100 °C hex), DATA[2]=Sensor 2 (Dragon 1.0/2.0 only single sensor)."
  params: []

- id: serial_code_get
  label: Serial Code - Get
  kind: query
  command: "05 01 00 15 11"
  notes: "Reply: 14 ASCII characters (DATA[1]..DATA[14])."
  params: []

- id: tiling_get
  label: Tiling - Get
  kind: query
  command: "05 01 00 23 27"
  notes: "Reply: Enable 0x00/0x01, Frame comp 0x00/0x01, Position 0x01..0x19 (or 0x96 Zero Bezel), V/H monitors encoded per Data[4] formula."
  params: []

- id: tiling_set
  label: Tiling - Set
  kind: action
  command: "09 01 00 22 {en} {fc} {pos} {vh} {checksum}"   # 0x00=no-change preserved for fc/pos/vh
  notes: "DATA[2] frame comp: 0x00=No, 0x01=Yes, 0x02=don't overwrite. DATA[4] = (V-1)*N + H, N=5 (non-Zero) or 15 (Zero Bezel)."
  params:
    - name: en
      type: integer
      description: "0x00=No, 0x01=Yes"
    - name: fc
      type: integer
      description: "0x00=No, 0x01=Yes, 0x02=keep"
    - name: pos
      type: integer
      description: Position 1..25 (or 1..150 Zero Bezel)
    - name: vh
      type: integer
      description: Encoded (V-1)*N + H

- id: anytile_set_group_monitor_id
  label: AnyTile - Set Group ID & Monitor ID
  kind: action
  command: "{ms} 01 00 C0 {mon} {grp} {checksum}"
  notes: "Source: IP only, not RS-232. Dragon 1.x / Dragon 1.6 / Himalaya 2.0 platforms."
  params:
    - name: mon
      type: integer
      description: Monitor ID
    - name: grp
      type: integer
      description: Group ID

- id: anytile_set_custom_tiling
  label: AnyTile - Custom Tiling - Set
  kind: action
  command: "{ms} 01 00 4B {en} {rotlsb} {rotmsb} {hslsb} {hsmsb} {vslsb} {vsmsb} {hlslsb} {hsizemsb} {vsizeLsb} {vsizemsb} {checksum}"
  notes: "Platform: Dragon 1.x, Dragon 1.6, Himalaya 2.0. Canvas tiling must be activated in admin menu. Rotation pairs (lsb/msb): 0=0x00/0x00, 90=0x5A/0x00, 270=0x0E/0x10."
  params:
    - name: en
      type: integer
      description: "0x00=No, 0x01=Yes"
    - name: rotlsb
      type: integer
      description: Rotation LSB
    - name: rotmsb
      type: integer
      description: Rotation MSB
    - name: hslsb
      type: integer
      description: Input H Start LSB
    - name: hsmsb
      type: integer
      description: Input H Start MSB
    - name: vslsb
      type: integer
      description: Input V Start LSB
    - name: vsmsb
      type: integer
      description: Input V Start MSB
    - name: hlslsb
      type: integer
      description: Input H Size LSB
    - name: hsizemsb
      type: integer
      description: Input H Size MSB
    - name: vsizeLsb
      type: integer
      description: Input V Size LSB
    - name: vsizemsb
      type: integer
      description: Input V Size MSB

- id: anytile_get_custom_tiling
  label: AnyTile - Custom Tiling - Report/Get
  kind: query
  command: "05 01 00 4A 4F"
  params: []

- id: display_monitor_id_set
  label: Display Monitor ID - Set
  kind: action
  command: "{ms} 01 00 4C {monid} {checksum}"   # enable on-screen display of monitor ID
  notes: "Platform-restricted per source."
  params:
    - name: monid
      type: integer
      description: Monitor ID to display

- id: anytile_resolution_mode_set
  label: AnyTile Resolution Mode - Set
  kind: action
  command: "06 01 00 4F {mode} {checksum}"   # 0x00=default, 0x01=FHD, 0x02=UHD4K
  params:
    - name: mode
      type: integer
      description: "0x00=default, 0x01=FHD, 0x02=UHD4K"

- id: anytile_resolution_mode_get
  label: AnyTile Resolution Mode - Get
  kind: query
  command: "05 01 00 4E 4B"
  params: []

- id: light_sensor_get
  label: Light Sensor - Get
  kind: query
  command: "05 01 00 25 21"
  notes: "Reply: 0x00=Off, 0x01=On, 0xFF=HW unavailable."
  params: []

- id: light_sensor_set
  label: Light Sensor - Set
  kind: action
  command: "06 01 00 24 {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On"

- id: human_sensor_get
  label: Human Sensor (CRD41) - Get
  kind: query
  command: "05 01 00 B3 B7"
  notes: "Reply: 0x00=Off, 0x01=10 min .. 0x06=60 min, 0xFF=HW unavailable."
  params: []

- id: human_sensor_set
  label: Human Sensor - Set
  kind: action
  command: "06 01 00 B4 {mins} {checksum}"
  notes: "Platform: Dragon 1.x (firmware TBC), Himalaya 2.0, Dragon 1.6."
  params:
    - name: mins
      type: integer
      description: "0x00=Off, 0x01=10 min, 0x02=20 min, 0x03=30 min, 0x04=40 min, 0x05=50 min, 0x06=60 min"

- id: osd_rotating_get
  label: OSD Rotating - Get
  kind: query
  command: "05 01 00 27 23"
  notes: "Reply: 0x00=Off, 0x01=On."
  params: []

- id: osd_rotating_set
  label: OSD Rotating - Set
  kind: action
  command: "06 01 00 26 {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On"

- id: display_orientation_get
  label: Display Orientation - Get
  kind: query
  command: "05 01 00 16 12"
  notes: "Reply: Auto Rotate, OSD Rotation (0x00=Landscape, 0x01=Portrait), Image All, Display Windows 1..4 on/off. Platform: Dragon 1.0/1.5/1.6, Himalaya 2.0, CRD50."
  params: []

- id: display_orientation_set
  label: Display Orientation - Set
  kind: action
  command: "0C 01 00 17 {auto} {osdrot} {img} {w1} {w2} {w3} {w4} {checksum}"   # example for portrait: 0C 01 00 17 00 00 01 00 00 00 00 1B
  params:
    - name: auto
      type: integer
      description: "0x00=Off, 0x01=On (Dragon 1 / 1.5 only)"
    - name: osdrot
      type: integer
      description: "OSD rotation 0=Landscape, 1=Portrait"
    - name: img
      type: integer
      description: "Image all 0..3 (3 CCW, CRD50 only)"
    - name: w1
      type: integer
      description: "Display Window 1 (main) 0/1"
    - name: w2
      type: integer
      description: "Display Window 2 (sub1) 0/1"
    - name: w3
      type: integer
      description: "Display Window 3 (sub2) 0/1"
    - name: w4
      type: integer
      description: "Display Window 4 (sub3) 0/1"

- id: information_osd_get
  label: Information OSD Feature - Get
  kind: query
  command: "05 01 00 2D 2A"
  notes: "Reply: 0x00=Off, 0x01..0x3C = 1..60 sec display."
  params: []

- id: information_osd_set
  label: Information OSD Feature - Set
  kind: action
  command: "06 01 00 2C {sec} {checksum}"   # 0x00=Off, 0x01..0x3C seconds
  params:
    - name: sec
      type: integer
      description: "0x00=Off, 0x01..0x3C = 1..60 sec"

- id: memc_get
  label: MEMC Effect - Get
  kind: query
  command: "05 01 00 29 2D"
  notes: "Source: not supported on Himalaya 1.0/1.2, Dragon 1.x/1.6."
  params: []

- id: memc_set
  label: MEMC Effect - Set
  kind: action
  command: "06 01 00 28 {lvl} {checksum}"   # 0x00=Off, 0x01=Low, 0x02=Medium, 0x03=High
  params:
    - name: lvl
      type: integer
      description: "0x00..0x03 MEMC level"

- id: touch_feature_get
  label: Touch Feature - Get
  kind: query
  command: "05 01 00 1F 1B"
  notes: "Source: not supported on Himalaya 1.0/1.2, Dragon 1.x/2.0."
  params: []

- id: touch_feature_set
  label: Touch Feature - Set
  kind: action
  command: "06 01 00 1E {state} {checksum}"   # 0x00=Off, 0x01=On
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On"

- id: noise_reduction_get
  label: Noise Reduction - Get
  kind: query
  command: "05 01 00 2B 2F"
  notes: "Reply: 0x00=Off, 0x01=Low, 0x02=Middle, 0x03=High, 0x04=default (Challenger 2.1 only)."
  params: []

- id: noise_reduction_set
  label: Noise Reduction - Set
  kind: action
  command: "06 01 00 2A {lvl} {checksum}"
  params:
    - name: lvl
      type: integer
      description: "0x00..0x04 noise reduction level"

- id: scan_mode_get
  label: Scan Mode - Get
  kind: query
  command: "05 01 00 51 55"
  notes: "Reply: 0x00=Overscan, 0x01=Underscan, 0x02=Off, 0x03..0x1C 0..25 (Challenger 2.1)."
  params: []

- id: scan_mode_set
  label: Scan Mode - Set
  kind: action
  command: "06 01 00 50 {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=Overscan, 0x01=Underscan, 0x02=Off"

- id: scan_conversion_get
  label: Scan Conversion - Get
  kind: query
  command: "05 01 00 53 57"
  notes: "Source: not supported on Himalaya 1.0/1.2, Dragon 1.x/1.6."
  params: []

- id: scan_conversion_set
  label: Scan Conversion - Set
  kind: action
  command: "06 01 00 52 {mode} {checksum}"   # 0x00=Progressive, 0x01=Interlace
  params:
    - name: mode
      type: integer
      description: "0x00=Progressive, 0x01=Interlace"

- id: switch_on_delay_get
  label: Switch On Delay (Tiling) - Get
  kind: query
  command: "05 01 00 55 51"
  notes: "Reply: 0x00=Off, 0x01=Auto, 0x02..0xFF=delay in seconds (2..255)."
  params: []

- id: switch_on_delay_set
  label: Switch On Delay (Tiling) - Set
  kind: action
  command: "06 01 00 54 {delay} {checksum}"
  params:
    - name: delay
      type: integer
      description: "0x00=Off, 0x01=Auto, 0x02..0xFF=seconds"

- id: factory_reset_set
  label: Factory Reset - Set
  kind: action
  command: "05 01 00 56 52"
  notes: "Resets user input control state, cold-start power, auto signal detect, video/color/PIP/volume/scheduling/etc. settings to factory defaults (per source table)."
  params: []

- id: power_on_logo_get
  label: Power On Logo - Get
  kind: query
  command: "05 01 00 3F 3B"
  notes: "Reply: 0x00=Off, 0x01=On, 0x02=User."
  params: []

- id: power_on_logo_set
  label: Power On Logo - Set
  kind: action
  command: "06 01 00 3E {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On, 0x02=User"

- id: fan_speed_get
  label: Fan Speed - Get
  kind: query
  command: "05 01 00 62 66"
  notes: "Reply: 0x00=Off, 0x01=Auto, 0x02=Low, 0x03=Middle, 0x04=High. Source: not supported on Dragon 1.x/1.6."
  params: []

- id: fan_speed_set
  label: Fan Speed - Set
  kind: action
  command: "06 01 00 61 {lvl} {checksum}"
  params:
    - name: lvl
      type: integer
      description: "0x00=Off, 0x01=Auto, 0x02=Low, 0x03=Middle, 0x04=High"

- id: apm_get
  label: APM (Advanced Power Management) - Get
  kind: query
  command: "05 01 00 D1 D5"
  notes: "Reply: 0x00=Off, 0x01=On, 0x02=Mode 1 (TCP off/WOL on), 0x03=Mode 2 (TCP on/WOL off). Source: Himalaya / Eagle 1.3 only."
  params: []

- id: apm_set
  label: APM - Set
  kind: action
  command: "06 01 00 D0 {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=Off, 0x01=On, 0x02=Mode 1, 0x03=Mode 2"

- id: power_saving_status_get
  label: Power Saving Mode Status - Get
  kind: query
  command: "05 01 00 D3 D7"
  notes: "Reply: 0x00=RGB Off & Video Off, 0x01=RGB Off/Video On, 0x02=RGB On/Video Off, 0x03=RGB On/Video On, 0x04..0x07 = mode 1..4 (Dragon 1.x / 1.6 / Challenger 2.1)."
  params: []

- id: power_saving_status_set
  label: Power Saving Mode Status - Set
  kind: action
  command: "06 01 00 D2 {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00..0x07 power saving mode"

- id: pixel_shift_get
  label: Pixel Shift - Get
  kind: query
  command: "05 01 00 B1 B5"
  notes: "Reply: 0x00=Off, 0x01=10 s, 0x02=20 s, ..., 0x5A=900 s, 0x5B=AUTO. Dragon 1.0 / 1.5 only."
  params: []

- id: pixel_shift_set
  label: Pixel Shift - Set
  kind: action
  command: "06 01 00 B2 {val} {checksum}"
  params:
    - name: val
      type: integer
      description: "0x00=Off, 0x01..0x5A=seconds (10..900), 0x5B=AUTO"

- id: off_timer_get
  label: Off Timer - Get
  kind: query
  command: "05 01 00 91 95"
  notes: "Reply: 0x00=Off, 0x01..0x18=1..24 hours. Dragon 1.0 / 1.5 only."
  params: []

- id: off_timer_set
  label: Off Timer - Set
  kind: action
  command: "06 01 00 92 {hours} {checksum}"
  params:
    - name: hours
      type: integer
      description: "0x00=Off, 0x01..0x18=1..24 hours"

- id: eco_mode_get
  label: ECO Mode - Get
  kind: query
  command: "05 01 00 63 67"
  notes: "Reply: 0x00=Low power standby, 0x01=Normal. Phoenix 1 & 2 only."
  params: []

- id: eco_mode_set
  label: ECO Mode - Set
  kind: action
  command: "06 01 00 64 {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=Low power standby, 0x01=Normal"

- id: picture_style_get
  label: Picture Style - Get
  kind: query
  command: "05 01 00 65 61"
  notes: "Reply: 0x00=Highbright, 0x01=sRGB, 0x02=Vivid, 0x03=Natural, 0x04=Standard, 0x05=Video, 0x06=Static Signage, 0x07=Text, 0x08=Energy saving, 0x09=Soft, 0x0A=User. Phoenix 1 & 2 only."
  params: []

- id: picture_style_set
  label: Picture Style - Set
  kind: action
  command: "06 01 00 66 {style} {checksum}"
  params:
    - name: style
      type: integer
      description: "Picture style 0x00..0x0A"

- id: send_screenshot_set
  label: Take screenshot and email - Set
  kind: action
  command: "05 01 00 58 5C"
  notes: "Saves {yyyy-MM-dd-HH-mm-ss}.png to internal storage/Philips/Screenshots and emails per configured SMTP. Himalaya 2 / Dragon 2, firmware TBC."
  params: []

- id: video_signal_present_get
  label: Video Signal Present - Get
  kind: query
  command: "05 01 00 59 5D"
  notes: "Reply: 0x00=video not present, 0x01=video present. Firmware 'tbc' per source."
  params: []

- id: frame_comp_horz_get
  label: Frame Compensation Horizontal - Get
  kind: query
  command: "05 01 00 5E 5A"
  notes: "Reply: 0x00..0xFF Horz frame compensation value."
  params: []

- id: frame_comp_horz_set
  label: Frame Compensation Horizontal - Set
  kind: action
  command: "06 01 00 5F {val} {checksum}"   # 0x00..0xFF
  params:
    - name: val
      type: integer
      description: Horizontal frame comp 0..255

- id: frame_comp_vert_get
  label: Frame Compensation Vertical - Get
  kind: query
  command: "05 01 00 67 63"
  notes: "Reply: 0x00..0xFF Vert frame compensation value."
  params: []

- id: frame_comp_vert_set
  label: Frame Compensation Vertical - Set
  kind: action
  command: "06 01 00 68 {val} {checksum}"
  params:
    - name: val
      type: integer
      description: Vertical frame comp 0..255

- id: scheduling_get
  label: Scheduling Parameters - Get
  kind: query
  command: "06 01 00 5B 01 5D"   # DATA[1]=page 1..7
  notes: "Reply: Page enable, Start/End hour/minute, video source, working-day mask, optional Tag (Dragon 1.x/1.6/Himalaya 2.0)."
  params:
    - name: page
      type: integer
      description: Scheduling page 1..7

- id: scheduling_set
  label: Scheduling Parameters - Set
  kind: action
  command: "0C 01 00 5A {pagebyte} {sh} {sm} {eh} {em} {src} {wd} {tag?} {checksum}"
  notes: "DATA[1] bits 7..4 = page 1..7, bits 3..0 = 0 disable / 1 enable. DATA[6] source per input_source_set enum. DATA[7] working-day mask. DATA[8] tag 1..7 (platform-restricted)."
  params:
    - name: pagebyte
      type: integer
      description: "bits 7..4 page 1..7, bits 3..0 0=disable 1=enable"
    - name: sh
      type: integer
      description: Start hour 0..23
    - name: sm
      type: integer
      description: Start minute 0..59
    - name: eh
      type: integer
      description: End hour 0..23
    - name: em
      type: integer
      description: End minute 0..59
    - name: src
      type: integer
      description: Video source ID
    - name: wd
      type: integer
      description: "Working-day mask bits: bit0=every week, bit1=Mon..bit7=Sun"
    - name: tag
      type: integer
      description: "Optional Tag 1..7 (Dragon 1.x/1.6/Himalaya 2.0)"

- id: group_id_get
  label: Group ID - Get
  kind: query
  command: "05 01 00 5D 59"
  notes: "Reply: 0x01..0xFE = group 1..254, 0xFF=Off."
  params: []

- id: group_id_set
  label: Group ID - Set
  kind: action
  command: "06 01 00 5C {gid} {checksum}"   # 0x01..0xFE, 0xFF=Off
  params:
    - name: gid
      type: integer
      description: "0x01..0xFE group, 0xFF=Off"

- id: custom_multi_win_set
  label: Custom Multi-Win Execute - Set
  kind: action
  command: "07 01 00 FB {on} {n} {checksum}"   # 0x00=Off/0x01=On, n=0..3 windows
  notes: "Activates 1..4 PIP/PBP windows. Aspect ratio 16:9 only; width/height can't exceed panel resolution."
  params:
    - name: on
      type: integer
      description: "0x00=Off, 0x01=On"
    - name: n
      type: integer
      description: "0..3 windows (0=1 win, 3=4 win)"

- id: custom_multi_win_get
  label: Custom Multi-Win - Report/Get
  kind: query
  command: "06 01 00 FD {win} {checksum}"   # DATA[1] = window 0..3
  notes: "Reply: per-window image rotation, X/Y position, width/height (pixel hex), picture format."
  params:
    - name: win
      type: integer
      description: "Window 0=Main, 1=Sub1, 2=Sub2, 3=Sub3"

- id: custom_multi_win_image_set
  label: Custom Multi-Win - Set image data
  kind: action
  command: "10 01 00 FC {win} {rot} {xhi} {xlo} {yhi} {ylo} {whi} {wlo} {hhi} {hlo} {pf} {checksum}"
  notes: "Phoenix 2.0 supported. DATA[11] picture format per picture_format_set enum (0xFF=don't change)."
  params:
    - name: win
      type: integer
      description: "Window index 0..3"
    - name: rot
      type: integer
      description: "Rotation 0=Off, 1=90, 2=270, 3=H-mirror, 4=V-mirror, 5=HV-mirror"
    - name: xhi
      type: integer
      description: X position high byte
    - name: xlo
      type: integer
      description: X position low byte
    - name: yhi
      type: integer
      description: Y position high byte
    - name: ylo
      type: integer
      description: Y position low byte
    - name: whi
      type: integer
      description: Width high byte
    - name: wlo
      type: integer
      description: Width low byte
    - name: hhi
      type: integer
      description: Height high byte
    - name: hlo
      type: integer
      description: Height low byte
    - name: pf
      type: integer
      description: "Picture format 0x00..0x06 or 0xFF=keep current"

- id: monitor_id_set
  label: Set Monitor ID
  kind: action
  command: "06 {monaddr} 00 69 {id} {checksum}"   # DATA[0]=0x69, DATA[1]=0x01..0xFF; Control byte is the current monitor address
  notes: "Source: models TBC; used to renumber displays."
  params:
    - name: monaddr
      type: integer
      description: Current monitor address 0x01..0xFF
    - name: id
      type: integer
      description: New monitor ID 0x01..0xFF

- id: led_control_get
  label: LED Strip (10BDL3051T) - Get
  kind: query
  command: "{ms} 01 00 F4 {checksum}"   # Reply carries LED on/off + R/G/B values
  notes: "Specific to 10BDL3051T; not Phoenix 2.0 family."
  params: []

- id: led_control_set
  label: LED Strip (10BDL3051T) - Set
  kind: action
  command: "09 01 00 F3 {on} {r} {g} {b} {checksum}"   # on=0x00/0x01, RGB 0x00..0xFF; example OFF 09 01 00 F3 00 FF 00 00 04
  notes: "Specific to 10BDL3051T; controls both left+right strips together."
  params:
    - name: on
      type: integer
      description: "0x00=Off, 0x01=On"
    - name: r
      type: integer
      description: Red 0..255
    - name: g
      type: integer
      description: Green 0..255
    - name: b
      type: integer
      description: Blue 0..255

- id: external_storage_lock_get
  label: MicroSD/USB Port Lock - Get
  kind: query
  command: "05 01 00 F2 F6"
  notes: "Reply: 0x00=unlocked, 0x01=locked. Source: 10BDL3051T (Dragon 1.0/1.5/1.6 firmware TBC+), QL3.0 firmware TBC."
  params: []

- id: external_storage_lock_set
  label: MicroSD/USB Port Lock - Set
  kind: action
  command: "06 01 00 F1 {state} {checksum}"   # 0x00=unlocked, 0x01=locked
  notes: "Bulk lock/unlock of all USB-A / micro-USB / MicroSD; per-port control not available."
  params:
    - name: state
      type: integer
      description: "0x00=unlocked, 0x01=locked"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [power_off, on]
  notes: "0x01=Power Off, 0x02=On (special note: 2016 10BDL3051T defines 0x01=Power Off/backlight off, 0x02=On)."

- id: power_cold_start_state
  type: enum
  values: [power_off, forced_on, last_status]
  notes: "0x00=Power Off, 0x01=Forced On, 0x02=Last Status."

- id: ir_lock_state
  type: enum
  values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume, primary, secondary, lock_all_except_power_volume]

- id: keypad_lock_state
  type: enum
  values: [unlock_all, lock_all, lock_all_but_power, lock_all_but_volume, lock_all_except_power_volume]
  notes: "0x03/0x04/0x07 not valid for 10BDL3151T & 24BDL2451T."

- id: current_source
  type: enum
  values: [video, svideo, component, cvi2, vga, hdmi2, dp2, usb2, card_dvi_d, dp1, card_ops, usb1, hdmi, dvi_d, hdmi3, browser, smartcms, dms, internal_storage, media_player, pdf_player, custom, hdmi4, vga2, vga3, iwb]
  notes: "DATA[1] of 0xAD report per input_source_set enum."

- id: current_playlist
  type: integer
  notes: "0x00=no playlist/URL, 0x01..0x07 = playlist/URL slot 1..7."

- id: auto_signal_detect_mode
  type: enum
  values: [off, all, reserved, pc_only, video_only, failover]

- id: failover_priorities
  type: list
  notes: "Up to 16 entries from input_source_set enum."

- id: video_params_brightness
  type: integer
  range: [0, 100]

- id: video_params_color
  type: integer
  range: [0, 100]

- id: video_params_contrast
  type: integer
  range: [0, 100]

- id: video_params_sharpness
  type: integer
  range: [0, 100]
  notes: "Phoenix 2.0 range 0..10."

- id: video_params_tint
  type: integer
  range: [-50, 100]
  notes: "Phoenix 2.0 range -50..+50 (signed byte). Other platforms 0..100."

- id: video_params_black_level
  type: integer
  range: [0, 100]

- id: video_params_gamma
  type: enum
  values: [native, s_gamma, gamma_2_2, gamma_2_4, d_image_dicom]

- id: color_temperature_preset
  type: enum
  values: [user_1, native, reserved_11000K, 10000K, 9300K, 7500K, 6500K, reserved_5770K, reserved_5500K, 5000K, 4000K, reserved_3400K, reserved_3350K, 3000K, reserved_2800K, reserved_2600K, reserved_1850K, user_2]

- id: color_temperature_100k
  type: integer
  range: [20, 100]
  notes: "Phoenix 2.0 effective range 26..100 (0x1A..0x64)."

- id: rgb_gain_offset
  type: object
  notes: "Red/Green/Blue gain 0..255 and Red/Green/Blue offset 0..255."

- id: picture_format
  type: enum
  values: [normal_4_3, custom, real_1_1, full, 21_9, dynamic, 16_9]
  notes: "0x05=Dynamic not supported on 2016 Dragon 1.x."

- id: vga_params
  type: object
  notes: "Clock/Clock-Phase (Invalid per source)/H Position/V Position each 0..100."

- id: pip_mode
  type: enum
  values: [off, pip, pop, quick_swap, pbp_2win, pbp_3win, pbp_4win, pbp_3win_1, pbp_3win_2, pbp_4win_1, sicp_custom]
  notes: "Phoenix 2.0 unsupported; HIMALAYA 2.0 doesn't support POP (0x02)."

- id: pip_position
  type: integer
  range: [0, 4]

- id: volume_speaker
  type: integer
  range: [0, 100]
  notes: "Phoenix 2.0 capped at 60."

- id: volume_audio
  type: integer
  range: [0, 100]
  notes: "Phoenix 2.0 capped at 60; Himalaya 1.x / Eagle omit this byte."

- id: volume_mute
  type: enum
  values: [off, on]

- id: treble_bass
  type: object
  notes: "Treble & Bass 0..100 (Phoenix 2.0: -8..+8 signed)."

- id: operating_hours
  type: integer
  notes: "16-bit counter, MSB/LSB in Data[1]/Data[2]."

- id: smart_power_level
  type: enum
  values: [off, low, medium, high]

- id: temperature_sensors
  type: object
  notes: "Sensor 1 and (optionally) Sensor 2 in 0..100 °C hex."

- id: serial_code
  type: string
  notes: "14 ASCII characters."

- id: tiling_state
  type: object
  notes: "Enable, Frame comp, Position, encoded V/H monitors; max position 25 (or 150 Zero Bezel); V/H formula Data[4] = (V-1)*N + H (N=5 or 15)."

- id: light_sensor_state
  type: enum
  values: [off, on, hw_unavailable]
  notes: "0xFF indicates HW not present."

- id: human_sensor_state
  type: enum
  values: [off, 10_min, 20_min, 30_min, 40_min, 50_min, 60_min, hw_unavailable]

- id: osd_rotating_state
  type: enum
  values: [off, on]

- id: display_orientation
  type: object
  notes: "Auto Rotate (Dragon 1/1.5 only), OSD Rotation Landscape/Portrait, Image All flag, Display Windows 1..4 on/off."

- id: information_osd_state
  type: integer
  range: [0, 60]
  notes: "0=Off, 1..60 sec."

- id: memc_level
  type: enum
  values: [off, low, medium, high]

- id: touch_feature_state
  type: enum
  values: [off, on]

- id: noise_reduction_level
  type: enum
  values: [off, low, middle, high, default]
  notes: "0x04 default only valid on Challenger 2.1."

- id: scan_mode
  type: enum
  values: [overscan, underscan, off, 0..25]
  notes: "0x03..0x1C numeric mode 0..25 only on Challenger 2.1."

- id: scan_conversion
  type: enum
  values: [progressive, interlace]

- id: switch_on_delay
  type: integer
  range: [0, 255]
  notes: "0=Off, 1=Auto, 2..255 seconds."

- id: power_on_logo
  type: enum
  values: [off, on, user]

- id: fan_speed
  type: enum
  values: [off, auto, low, middle, high]

- id: apm_mode
  type: enum
  values: [off, on, mode_1_tcp_off_wol_on, mode_2_tcp_on_wol_off]

- id: power_saving_mode
  type: enum
  values: [rgb_off_video_off, rgb_off_video_on, rgb_on_video_off, rgb_on_video_on, mode_1, mode_2, mode_3, mode_4]
  notes: "mode_1..mode_4 only valid on Dragon 1.x / 1.6 / Challenger 2.1."

- id: pixel_shift
  type: integer
  range: [0, 91]
  notes: "0=Off, 0x01..0x5A = 10..900 s, 0x5B=AUTO."

- id: off_timer
  type: integer
  range: [0, 24]
  notes: "0=Off, 1..24 hours."

- id: eco_mode
  type: enum
  values: [low_power_standby, normal]
  notes: "Phoenix 1 & 2 only."

- id: picture_style
  type: enum
  values: [highbright, srgb, vivid, natural, standard, video, static_signage, text, energy_saving, soft, user]
  notes: "Phoenix 1 & 2 only. Availability per OSD menu."

- id: video_signal_present
  type: enum
  values: [not_present, present]

- id: frame_comp_horz
  type: integer
  range: [0, 255]

- id: frame_comp_vert
  type: integer
  range: [0, 255]

- id: scheduling_page
  type: object
  notes: "Page enable, Start/End hour/min, source ID, working-day mask, optional Tag 1..7."

- id: group_id
  type: integer
  range: [0, 254]
  notes: "0x01..0xFE = 1..254, 0xFF = Off."

- id: custom_multi_win
  type: object
  notes: "Per-window: rotation, X/Y/width/height pixel hex, picture format (0xFF=keep)."

- id: led_strip_state
  type: object
  notes: "10BDL3051T only: on/off + R/G/B values 0..255."

- id: external_storage_lock
  type: enum
  values: [unlocked, locked]
```

## Variables
```yaml
# UNRESOLVED: source documents no continuous settable parameters outside of the discrete actions above
# (e.g. no separate "volume" variable channel - volume is set per-action). Section left empty.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited device-pushed notifications beyond Get/Set/Report exchanges. Section omitted.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences; scheduling (0x5A/0x5B) is the closest analogue and is represented as a single action with parameters.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset_set   # Resets all user settings to factory defaults
  - external_storage_lock_set   # Bulk-locks all USB/SD access; commercial-malware-mitigation use
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, power-on sequencing rules, or fault-recovery procedures.
```

## Notes
- **Source / provenance.** SICP v2.03, the Philips professional-display serial/ethernet protocol. Source explicitly names BDL4270EL, BDL4970EL, BDL5570EL as Phoenix 2.0 platform (year 2015 BDLxx70EL/BDLxx90VL/BDLxx30QL/BDLxx35QL) in the Platforms table (section 15 of the refined document) and in the "SPECIAL NOTE" callouts on Tint range, sharpness range, ECO mode, and picture style.
- **Transport availability.** Both RS-232C and Ethernet are documented for the same protocol — same packet format, same opcodes, same checksum. The only transport-specific bit is the "AnyTile Group/Monitor ID Set" (0xC0), which the source says only works via IP. LED strip and screenshot commands target specific models (10BDL3051T) that are not in this Phoenix 2.0 family but are listed for completeness.
- **Phoenix 2.0 platform quirks captured in the spec:** (a) sharpness range 0..10 (not 0..100); (b) tint signed -50..+50 (not 0..100); (c) treble/bass signed -8..+8 (not 0..100); (d) volume 0..60 (not 0..100); (e) PIP not supported; (f) PIP source not supported; (g) anytile / canvas tiling not supported (Dragon 1.x/1.6/Himalaya 2.0 only).
- **Firmware-version "TBC" calls.** Many commands carry a "from firmware version: TBC" or platform-restriction note in the source. The spec preserves those notes inline but does not invent a version number.
- **Checksum computation.** All packets: trailing checksum = XOR of MsgSize, Control, Group, and all Data bytes (NOT the checksum itself). The spec's `command:` strings carry literal source bytes including the checksum; callers who compute the message dynamically must XOR-derive the last byte.
- **Retry / collision.** Source: "A new command should not be sent until the previous command is acknowledged. If a response is not received within 500 milliseconds a retry may be triggered." Daisy-chain broadcast collisions (Monitor ID 0x00) are silent by design.
- **Group vs. Monitor ID.** Both Control and Group fields are present; the source includes both layouts (with and without Group byte) in §2.2.1. Phoenix 2.0 family models per the Platforms table support Group ID via 0x5C/0x5D.

<!-- UNRESOLVED: firmware version range that the family is tested/known to support is not stated; power-on sequencing rules are not stated; any safety/lockout/emergency behavior beyond the lock commands enumerated is not stated. -->
```

```md

## Provenance

```yaml
source_domains:
  - community.xibo.org.uk
  - ryoyo.co.jp
  - digis.ru
  - support.westan.com.au
  - documents.philips.com
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.ryoyo.co.jp/media/philips/bdl4270el_11/Philips_29.pdf
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.documents.philips.com/assets/20230601/754c61ee41be44d9962ab01400924da6.pdf
retrieved_at: 2026-07-24T19:16:37.693Z
last_checked_at: 2026-08-05T08:37:24.845Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:37:24.845Z
matched_actions: 123
action_count: 123
confidence: medium
summary: "All 123 spec actions matched source opcodes verbatim; transport values present; coverage ≈123/124 unique opcodes. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- 0xFE
- "source does not state a specific firmware version; several commands list firmware-version \"TBC\" prerequisites (restart, video-present, frame compensation, off-timer, pixel-shift, ECO mode, picture style, volume mute, off-timer, monitor-restart, failover volume limits, etc.). Operability of those commands is firmware-conditional."
- "source documents no continuous settable parameters outside of the discrete actions above"
- "source does not document unsolicited device-pushed notifications beyond Get/Set/Report exchanges. Section omitted."
- "source does not document multi-step macro sequences; scheduling (0x5A/0x5B) is the closest analogue and is represented as a single action with parameters."
- "source contains no explicit safety warnings, power-on sequencing rules, or fault-recovery procedures."
- "firmware version range that the family is tested/known to support is not stated; power-on sequencing rules are not stated; any safety/lockout/emergency behavior beyond the lock commands enumerated is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
